import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ProfilePopover() {
  return (
    <>
      <Popover>
        <PopoverTrigger className="hover:cursor-pointer hover:brightness-90">
          <Avatar className="size-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <div className="flex flex-col">
            <div className="flex items-center gap-5 border-b-1 pb-4 pr-4">
              {" "}
              <Avatar className="size-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>EK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start gap-1">
                <Button variant={"link"} className="p-0 m-0 h-fit">
                  Erdem Koyuncu
                </Button>
                <Button
                  variant={"link"}
                  className="text-sm text-muted-foreground hover:cursor-pointer hover: p-0 m-0 h-fit"
                >
                  skleran
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <Link
                href={"/new-story"}
                className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Write
              </Link>
              <div className="border-b-1" />
              <Link
                href={"/"}
                className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Profile
              </Link>
              <Link
                href={"/plans"}
                className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Become a member
              </Link>
              <div className="border-b-1" />
              <Link
                href={"/login"}
                className="text-sm text-foreground/60 transition-colors hover:text-destructive/80"
              >
                Sign out
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
