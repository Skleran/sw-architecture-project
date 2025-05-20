import Link from "next/link";
import { Button } from "./button";
import { MessageCircle, ThumbsUp } from "lucide-react";

type Article = {
  author: { name: string; image: string };
  title: string;
  excerpt: string;
  coverImage: string;
  release: string;
  likes: number;
  comments: number;
};

export default function HomeArticleCard({ data }: { data: Article }) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[680px] flex flex-col gap-3 mt-8">
        <div className="flex items-center gap-2">
          <img
            src={data.author.image}
            alt={data.author.name}
            className="size-6 rounded-full"
          />
          <Link href={"/"}>
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

        <div className="w-full grid grid-cols-[5fr_2fr] grid-rows-[auto_auto]">
          <div className="w-full flex flex-col gap-1.5">
            <h2 className="font-bold text-xl md:text-2xl leading-[1.15] md:leading-[1.25] md:tracking-[-0.01em] line-clamp-4 overflow-visible">
              {data.title}
            </h2>
            <div className="line-clamp-2 text-muted-foreground">
              {data.excerpt}
            </div>
          </div>
          <div className="w-full items-center flex pl-4 md:pl-10">
            <img
              src={data.coverImage}
              alt="cover"
              className="object-contain rounded-sm"
            />
          </div>

          <div className="w-full flex justify-between mt-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-5 text-muted-foreground text-[13px]">
              <p>{data.release}</p>
              <div className="flex gap-1 items-center">
                <ThumbsUp size={15} />
                <p>{data.likes}</p>
              </div>
              <div className="flex gap-1 items-center">
                <MessageCircle size={15} />
                <p>{data.comments}</p>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[680px] border-b mt-8" />
    </div>
  );
}
