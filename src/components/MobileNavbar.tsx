import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { MenuIcon } from "lucide-react";
import React, { useState } from "react";
import { useMedia } from "react-use";
import Sidebar from "@/app/(root)/dashboard/_components/Sidebar";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia("(min-width: 1024px)", false);


  return (
    <div className="block lg:hidden h-full">
      {!isMobile && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <div className="rounded-md border-2 p-2 font-normal text-gray-900 transition-all">
              <MenuIcon className="size-4" />
            </div>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-72">
            <DialogTitle className="pt-4 pb-2 flex w-full items-center justify-center"></DialogTitle>
            <div className="flex h-full flex-col justify-between">
                <Sidebar />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default MobileNavbar;
