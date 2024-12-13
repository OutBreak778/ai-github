import axios from "axios";
import { db } from "@/server/db";
import { Octokit } from "octokit";
import { AiSummaryCommit } from "./gemini";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN!,
});

type Response = {
  commitMessage: string;
  commitHash: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: string;
};

export const gitCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  const [owner, repo] = githubUrl.split("/").slice(-2);
  if (!owner || !repo) {
    throw new Error("Invalid github URL");
  }

  const { data } = await octokit.rest.repos.listCommits({
    owner: owner ?? "",
    repo: repo ?? "",
  });

  // console.log(data);
  const sorted = data.sort(
    (a, b) =>
      new Date(b.commit.author?.date ?? "").getTime() -
      new Date(a.commit.author?.date ?? "").getTime(),
  );

  return sorted.slice(0, 15).map((item) => ({
    commitHash: item.sha ?? "",
    commitMessage: item.commit.message ?? "",
    commitAuthorName: item.commit.author?.name ?? "",
    commitAuthorAvatar: item?.author?.avatar_url ?? "",
    commitDate: item?.commit.author?.date ?? "",
  }));
};

export const pullCommits = async (projectId: string) => {
  const { project, githubUrl } = await fetchCommits(projectId);
  const commits = await gitCommitHashes(githubUrl);
  const commitProcess = await filterProcessCommit(projectId, commits);
  const summarizeResponse = await Promise.allSettled(
    commitProcess.map((item) => {
      return SummaryCommit(githubUrl, item.commitHash);
    }),
  );

  const summarize = summarizeResponse.map((item) => {
    if (item.status === "fulfilled") {
      return item.value;
    }

    return "";
  });

  const commit = await db.commit.createMany({
    data: summarize.map((summary, index) => {
      console.log(`summrizine count: ${index}`);
      return {
        projectId: projectId,
        commitHash: commitProcess[index]!.commitHash,
        commitMessage: commitProcess[index]!.commitMessage,
        commitAuthorName: commitProcess[index]!.commitAuthorName,
        commitAuthorAvatar: commitProcess[index]!.commitAuthorAvatar,
        commitDate: commitProcess[index]!.commitDate,
        summary,
      };
    }),
  });

  return commit;
};

export const SummaryCommit = async (githubUrl: string, commitHash: string) => {
  const { data }: { data: string } = await axios.get(
    `${githubUrl}/commit/${commitHash}.diff`,
    {
      headers: {
        Accept: "application/vnd.git.v3.diff",
      },
    },
  );

  return (await AiSummaryCommit(data)) || "";
};

export const fetchCommits = async (projectId: string) => {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: {
      githubUrl: true,
    },
  });

  if (!project?.githubUrl) {
    throw new Error("Project does not have github URL");
  }

  return { project, githubUrl: project?.githubUrl };
};

export const filterProcessCommit = async (
  projectId: string,
  commits: Response[],
) => {
  const processedCommits = await db.commit.findMany({
    where: {
      projectId,
    },
  });

  const unProcessedCommits = commits.filter(
    (item) =>
      !processedCommits.some((commit) => commit.commitHash === item.commitHash),
  );

  return unProcessedCommits;
};
