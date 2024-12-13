import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SidebarRotueProps {
  label: string;
  route: string;
  icon: LucideIcon;
  isActive?: boolean
}

const SidebarRotue = ({ label, route, icon: Icon, isActive }: SidebarRotueProps) => {
  return (
    <Link href={route} className="w-full items-center px-4 flex mb-2">
      <div
        className={cn(
          "flex w-full justify-start rounded-lg border-none px-3 py-2 font-normal text-gray-600/80 outline-none transition hover:bg-gray-300/30 hover:text-gray-600 focus:bg-gray-600/10 focus-visible:ring-transparent focus-visible:ring-offset-0",
          isActive && "bg-blue-600/80 text-gray-50"
        )}
        >
        <Icon className="mr-3 h-5 w-5" />
        <span className="text-[14px]">{label}</span>
      </div>
    </Link>
  );
};

export default SidebarRotue;
