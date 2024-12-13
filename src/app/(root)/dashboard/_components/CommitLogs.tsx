"use client";

import EmptyProject from "@/components/EmptyProjects";
import { Skeleton } from "@/components/ui/skeleton";
import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CommitLogs = () => {
  const { projectId, response } = useProject();
  const { data: commits, isLoading } = api.project.getCommits.useQuery({
    projectId,
  });

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center my-4">
      {
        commits?.length === 0 && <EmptyProject message="This Project does not have any commits yet !" actions="Create a new Commit" />
      }
      </div>
      <ul className="space-y-6">
        {commits?.map((item, index) => (
          <li key={item.id} className="relative flex gap-x-4">
            <div
              className={cn(
                "absolute left-0 top-0 flex w-0 justify-center bg-gray-800",
                index === commits.length - 1 ? "h-6" : "-bottom-0",
              )}
            >
              <div className="w-[1px] translate-x-1 bg-gray-900"></div>
            </div>
            <div className="flex w-full space-x-3">
              {isLoading ? (
                <Skeleton className="mt-4 h-8 w-8 rounded-full bg-gray-300" />
              ) : (
                <Image
                  className="relative mt-4 size-8 flex-none rounded-full bg-gray-50"
                  src={item.commitAuthorAvatar}
                  alt="avatar img"
                  width={30}
                  height={30}
                />
              )}
              <div className="flex-auto rounded-md bg-white p-3 ring-1 ring-inset ring-gray-300">
                <div className="leading-0 text-sm font-medium text-gray-900">
                  <div className="flex items-center justify-between gap-x-4">
                    <Link
                      target="_blank"
                      className="flex items-center justify-between py-1 text-xs leading-5"
                      href={`${response?.githubUrl}/commit/${item.commitHash}`}
                    >
                      <span className="mr-1 text-[14px] font-medium capitalize text-gray-800">
                        {isLoading ? (
                          <Skeleton className="size-32 h-5 bg-gray-300" />
                        ) : (
                          item.commitAuthorName
                        )}
                      </span>
                      <span className="flex items-center justify-center text-[11px] capitalize text-gray-500">
                        {isLoading ? (
                          <Skeleton className="h-4 w-12 bg-gray-300" />
                        ) : (
                          <>
                            <ExternalLink className="size-4" />
                            visit{" "}
                          </>
                        )}
                      </span>
                    </Link>
                  </div>
                </div>
                <span className="line-clamp-2 font-semibold">
                  {isLoading ? (
                    <Skeleton className="h-7 w-full bg-gray-300" />
                  ) : (
                    item.commitMessage
                  )}
                </span>
                <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-500">
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full bg-gray-200" />
                      <Skeleton className="h-3 w-full bg-gray-200" />
                      <Skeleton className="h-3 w-full bg-gray-200" />
                    </div>
                  ) : (
                    <span>{item.summary}</span>
                  )}
                </pre>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitLogs;
