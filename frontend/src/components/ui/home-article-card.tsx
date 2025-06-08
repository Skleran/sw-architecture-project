import Link from "next/link";
import { Button } from "./button";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "./avatar";
import { ReactionType } from "@/lib/reactions";

type Article = {
  id: number;
  title: string;
  authorName: string;
  category: string;
  reactions: ReactionType[];
  // excerpt: string;
  // coverImage: string;
  // release: string;
  // likes: number;
  // comments: number;
};

export default function HomeArticleCard({ data }: { data: Article }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const authorInitials = getInitials(data.authorName);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[680px] flex flex-col gap-3 mt-8 mx-6">
        <div className="flex gap-2">
          <Link href={`/${data.authorName}`}>
            <Avatar className="size-6">
              {/* <AvatarImage
                src={data.author.image}
                alt={data.authorName}
                className="size-6 hover:brightness-90"
              /> */}
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
          </Link>

          <Link href={`/${data.authorName}`}>
            <Button
              variant={"link"}
              size={"sm"}
              className="p-0 m-0 h-auto"
              asChild
            >
              <p>{data.authorName}</p>
            </Button>
          </Link>
        </div>

        <Link
          href={`/${data.authorName}/${data.id}`}
          className="w-full grid grid-cols-[5fr_2fr] grid-rows-[auto_auto]"
        >
          <div className="w-full flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-2.5">
              <h2 className="font-extrabold text-xl md:text-2xl leading-[1.15] md:leading-[1.25] line-clamp-4 overflow-visible">
                {data.title}
              </h2>
              <div className="line-clamp-2 text-muted-foreground leading-5.5">
                {/* {data.excerpt} */} Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Maxime ullam corrupti, repellat itaque
                consectetur maiores.
              </div>
            </div>

            <div className="hidden md:flex items-center gap-5 text-muted-foreground text-[13px]">
              <p>{/* {data.release} */} 31h ago</p>
              <div className="flex gap-1 items-center">
                <ThumbsUp size={15} />
                <p>{/* {data.likes} */}123</p>
              </div>
              <div className="flex gap-1 items-center">
                <MessageCircle size={15} />
                <p>{/* {data.comments}*/} 69</p>
              </div>
            </div>
          </div>
          <div className="w-full items-center flex pl-4 md:pl-10 justify-center">
            <div className="">
              {/* <img
                src={data.coverImage}
                alt="cover"
                className="object-contain md:object-cover rounded-sm max-h-[100px] md:max-h-[120px] md:min-w-[120px]"
              /> */}
            </div>
          </div>

          <div className="w-full md:hidden flex justify-between mt-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-5 text-muted-foreground text-[13px]">
              <p>{/* {data.release} */} 31h ago</p>
              <div className="flex gap-1 items-center">
                <ThumbsUp size={15} />
                <p>{/* {data.likes} */}123</p>
              </div>
              <div className="flex gap-1 items-center">
                <MessageCircle size={15} />
                <p>{/* {data.comments}*/} 69</p>
              </div>
            </div>
            <div className=""></div>
          </div>
        </Link>
      </div>
      <div className="w-full max-w-[680px] border-b mt-8" />
    </div>
  );
}
