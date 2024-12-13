"use client"

import { Button } from "@/components/ui/button";
import useProject from "@/hooks/use-project";
// import useProject from "@/hooks/use-project";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommitLogs from "./_components/CommitLogs";
import { ScrollArea } from "@/components/ui/scroll-area";



const DashboardPage = () => {
  const { response } = useProject();
  return (
    <ScrollArea className="z-50 h-full w-full bg-gray-100/60 p-5 text-gray-700">
      <div className="flex items-center justify-between flex-row">
        <Button className="bg-blue-500 text-gray-50 hover:bg-blue-500 cursor-context-menu">
      <GithubIcon className="size-5 " />
          <span className="font-medium text-[12px]">This Project is connected to</span>
          <Link
            className="font-light underline underline-offset-2 text-[11px]"
            href={ "https://github.com"}
            target="_blank"
            >
            {response?.githubUrl}
          </Link>
        </Button>
        <div>
          Team members&nbsp;&nbsp;
          Invite&nbsp;&nbsp;
          Archives
        </div>
      </div>
      <div className="my-2">
        Ask your questions&nbsp;&nbsp;
        Meetings URL
      </div>
      <div className="my-2">
        <CommitLogs />
      </div>
    </ScrollArea>
  );
};

export default DashboardPage;
