import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import ArticleTagSelector from "./article-tag-selector";
import ProfilePopover from "./profile-popover";

export default function NewStoryNavbar() {
  return (
    <div className="mb-4 mx-6">
      <div className="w-full pt-4 pb-2 max-w-[1032px] mx-auto flex justify-between border-b-1">
        <div className="flex gap-3 items-center">
          <Link href={"/"} className="text-2xl font-serif tracking-tight h-7">
            ArticleWorm
          </Link>
          <div className="text-xs pt-1.5">Draft in User Name</div>
        </div>
        <div className="flex items-center gap-6 sm:gap-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="rounded-full">
                Publish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              {" "}
              <DialogTitle>Story Preview</DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="flex flex-col gap-6">
                <Textarea
                  name=""
                  id=""
                  placeholder="Write a preview subtitle"
                />
                <ArticleTagSelector />
                <Button variant={"outline"} className="rounded-full py-4.5">
                  Publish Now
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <ProfilePopover />
        </div>
      </div>
    </div>
  );
}
