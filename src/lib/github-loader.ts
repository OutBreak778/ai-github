import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { type Document } from "@langchain/core/documents";
import { generateEmbedding, summarizeCode } from "./gemini";
import { db } from "@/server/db";

export const githubLoader = async (githubUrl: string, githubToken?: string) => {
  // if(!githubToken) {
  //   throw new Error("Required the Github Token")
  // }
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken,
    branch: "main",
    ignoreFiles: [
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "bun.lockb",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });
  const docs = await loader.load();
  console.log(docs, "Documents of github-loader");

  return docs;
};

export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
) => {
  const docs = await githubLoader(githubUrl, githubToken);
  const allEmbeddings = await generateEmbeddings(docs);

  await Promise.allSettled(allEmbeddings.map(async (item,index) => {
    console.log(`Processing ${index} of ${item.embeddings.length}`)
    if(!item) return

    const sourceEmbeddings = await db.sourceCodeEmbeddings.create({
      data: {
        summary: item.summary,
        fileName: item.fileName,
        sourceCode: item.sourceCode,
        projectId
      }
    })
    await db.$executeRaw`
    UPDATE "SourceCodeEmbeddings"
    SET "summaryEmbeddings" = ${item.embeddings}::vector
    WHERE "id" = ${sourceEmbeddings.id}`

  }))
};

const generateEmbeddings = async (docs: Document[]) => {
  return await Promise.all(
    docs.map(async (item) => {
      const summary = await summarizeCode(item);
      const embeddings = await generateEmbedding(summary);

      return {
        summary,
        embeddings,
        sourceCode: (JSON.stringify(item.pageContent)),
        fileName: item.metadata.source as string
      };
    }),
  );
};
