import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-between gap-x-2">
      <div className="items-center hidden lg:flex space-x-2">
        <Image width={40} height={40} alt="Image" src="/logo.svg" />
        <span className="font-semibold text-xl text-[#fff]">OUTBREAK</span>
      </div>
    </Link>
  );
};

export default Logo;
