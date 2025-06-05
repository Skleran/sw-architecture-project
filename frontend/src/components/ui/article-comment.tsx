import { Comment } from "@/lib/comments";
import Link from "next/link";
import React from "react";

type Props = Comment;

export default function ArticleComment({ userName, content }: Props) {
  return (
    <div className="w-full flex flex-col gap-2 pt-7 pb-7 border-b-1">
      <Link href={`/${userName}`}>
        <div className="text-lg font-semibold">{userName}</div>
      </Link>

      <div className="text-sm leading-6">{content}</div>
    </div>
  );
}
