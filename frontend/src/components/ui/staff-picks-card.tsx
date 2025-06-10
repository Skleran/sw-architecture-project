"use client";

import Link from "next/link";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function StaffPicksCard() {
  return (
    <>
      <div className="flex flex-col gap-2">
        {/* author */}
        <div className="flex items-center gap-2">
          <Link href={"/test8"}>
            <Avatar className="size-5">
              <AvatarImage alt={"T"} className="size-5 hover:brightness-90" />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
          </Link>
          <Link href={"/test8"}>
            <Button
              variant={"link"}
              size={"sm"}
              className="p-0 m-0 h-auto"
              asChild
            >
              <p>test8</p>
            </Button>
          </Link>
        </div>
        <Link href={"/test8/62"} className="flex flex-col gap-2">
          {/* title */}
          <h2 className="font-bold text-base">
            Google’s New Material Design “Expressive” Has Me Excited!
          </h2>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {/* author */}
        <div className="flex items-center gap-2">
          <Link href={"/test8"}>
            <Avatar className="size-5">
              <AvatarImage alt={"T"} className="size-5 hover:brightness-90" />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
          </Link>
          <Link href={"/test8"}>
            <Button
              variant={"link"}
              size={"sm"}
              className="p-0 m-0 h-auto"
              asChild
            >
              <p>test8</p>
            </Button>
          </Link>
        </div>
        <Link href={"/test8/63"} className="flex flex-col gap-2">
          {/* title */}
          <h2 className="font-bold text-base">
            Great React engineers don’t make these five mistakes
          </h2>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {/* author */}
        <div className="flex items-center gap-2">
          <Link href={"/test8"}>
            <Avatar className="size-5">
              <AvatarImage alt={"T"} className="size-5 hover:brightness-90" />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
          </Link>
          <Link href={"/test8"}>
            <Button
              variant={"link"}
              size={"sm"}
              className="p-0 m-0 h-auto"
              asChild
            >
              <p>test8</p>
            </Button>
          </Link>
        </div>
        <Link href={"/test8/64"} className="flex flex-col gap-2">
          {/* title */}
          <h2 className="font-bold text-base">My Best Travel Advice</h2>
        </Link>
      </div>
    </>
  );
}
