"use client";

import {
  Bot,
  CreditCard,
  LayoutDashboard,
  PlusIcon,
  Presentation,
  Settings,
} from "lucide-react";
import React from "react";
import SidebarRotue from "./SidebarRotue";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useProject from "@/hooks/use-project";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyProject from "@/components/EmptyProjects";
import { Skeleton } from "@/components/ui/skeleton";

export const routes = [
  {
    id: 1,
    label: "Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    label: "Q&A",
    route: "/qa",
    icon: Bot,
  },
  {
    id: 3,
    label: "Mettings",
    route: "/mettings",
    icon: Presentation,
  },
  {
    id: 4,
    label: "Billing",
    route: "/billing",
    icon: CreditCard,
  },
  {
    id: 5,
    label: "Settings",
    route: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const path = usePathname();
  const { projects, projectId, setProjectId } = useProject();
  return (
    <div className="flex h-full flex-col justify-start lg:border-r">
      <Link
        href="/"
        className="mb-2 lg:mt-3 -mt-6 flex items-center justify-center gap-x-2 px-4 lg:py-2"
      >
        <Image
          width={40}
          height={40}
          className="invert"
          alt="Image"
          src="/logo.svg"
        />
        <span className="text-xl font-semibold">OUTBREAK</span>
      </Link>
      <Separator className="px-4" />
      <div className="w-full mt-4 flex items-center justify-center">
      <Button
        variant={"secondary"}
        className="flex w-[85%] items-center justify-center"
      >
        <Link href={"/create"} className="flex items-center font-medium">
          <PlusIcon className="mr-2 size-5" />
          Create Project
        </Link>
      </Button>
      </div>
      <Separator className="px-4 mt-4" />
      <div className="mt-2 w-60">
        <span className="mb-3 ml-7 items-center text-[11px] text-gray-400">
          MAIN MENU
        </span>
        {routes.map((item) => (
          <SidebarRotue
            key={item.id}
            label={item.label}
            icon={item.icon}
            route={item.route}
            isActive={path === item.route}
          />
        ))}
      </div>
      <Separator className="my-1 px-4" />

      <span className="ml-8 mt-4 flex items-start justify-start text-[11px] text-gray-400">
        PROJECTS
      </span>
      <ScrollArea className="h-[200px] rounded-md mt-2 border-2 border-gray-100/90 shadow-sm outline-none border-none">

      <div className="mt-1">
        <div className="flex items-center justify-center">
        {
          projects?.length === 0 && (
            <EmptyProject message="You don&apos;t have any Projects yet" actions="Create a new Project" />
          )
        }
        </div>
        {projects?.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-start"
              onClick={() => {
                setProjectId(item.id);
              }}
            >
              <div className="mb-2 w-full items-center px-4 cursor-pointer">
                <div
                  className={cn(
                    "flex w-full justify-start rounded-lg border-none px-3 py-2 font-normal text-gray-600/80 outline-none transition hover:bg-gray-300/30 hover:text-gray-600 focus:bg-gray-600/10 focus-visible:ring-transparent focus-visible:ring-offset-0",
                    item.id === projectId && "bg-blue-400/10"
                  )}
                >
                  <div
                    className={cn(
                      "mr-3 flex h-5 uppercase w-5 items-center justify-center rounded-sm bg-gray-600/20 p-3 text-[14px] text-gray-700",
                      item.id === projectId &&
                        "bg-blue-500 font-medium text-gray-50",
                    )}
                  >
                    {item.name[0]}
                  </div>
                  <span className="text-[14px]">{!item.name ? <Skeleton className="w-28 h-5 bg-gray-300" /> : item.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </ScrollArea>


    </div>
  );
};

export default Sidebar;
