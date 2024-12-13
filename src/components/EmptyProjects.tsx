import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface EmptyPropsProps {
  message: string
  actions?: string
}

const EmptyProject = ({message,actions}: EmptyPropsProps) => {
  return (
    <div className="flex h-40 w-4/5 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600/20">
      <div className="flex flex-col items-center justify-center">
        <h2 className={"text-[12px] font-medium"}>
          {message}
        </h2>
      </div>
      <Link href="/create" className="my-3">
        <Button variant="secondary" className="text-xs">
          <PlusIcon className=" size-4" /> {actions}
        </Button>
      </Link>
    </div>
  );
};

export default EmptyProject;
