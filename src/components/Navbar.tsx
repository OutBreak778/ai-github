"use client";

import React from "react";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <div className="absolute inset-x-0 top-0 z-30 h-16 w-full border-x border-b border-gray-200 bg-gray-50 backdrop-blur-lg transition-all">
      <div className="flex items-center justify-between lg:justify-end px-3 py-4 lg:px-16">
        <MobileNavbar />
        <Link
        href="/"
        className="mb-2 lg:hidden flex items-center justify-center gap-x-2 px-4"
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
        <div>
          <ClerkLoading>
            <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
