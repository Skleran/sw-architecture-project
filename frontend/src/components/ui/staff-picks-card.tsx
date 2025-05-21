"use client";

import Link from "next/link";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

type Article = {
  author: { name: string; image: string };
  title: string;
  excerpt: string;
  coverImage: string;
  release: string;
  likes: number;
  comments: number;
};

export default function StaffPicksCard({ data }: { data: Article }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const authorInitials = getInitials(data.author.name);

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* author */}
        <div className="flex items-center gap-2">
          <Link href={`/${data.author.name}`}>
            <Avatar className="size-5">
              <AvatarImage
                src={data.author.image}
                alt={data.author.name}
                className="size-5 hover:brightness-90"
              />
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
          </Link>
          <Link href={`/${data.author.name}`}>
            <Button
              variant={"link"}
              size={"sm"}
              className="p-0 m-0 h-auto"
              asChild
            >
              <p>{data.author.name}</p>
            </Button>
          </Link>
        </div>
        <Link
          href={`/${data.author.name}/${data.title}`}
          className="flex flex-col gap-2"
        >
          {/* title */}
          <h2 className="font-bold text-base">{data.title}</h2>
          {/* date */}
          <div className="text-[13px] text-muted-foreground">
            {data.release}
          </div>
        </Link>
      </div>
    </>
  );
}
