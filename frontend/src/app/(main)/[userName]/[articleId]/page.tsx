import ArticleCommentInput from "@/components/article-comment-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, MessageCircle, Save, Share, ThumbsUp } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ userName: string; articleId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  // const name = (await params).userName;
  const id = (await params).articleId;
  return {
    title: `Article id: ${id}`,
  };
};

export default async function Article({ params }: Props) {
  const { userName, articleId } = await params;

  return (
    <>
      <div className="flex flex-col w-full mx-6 max-w-[680px] mt-6 mb-16 border-b pb-16">
        <div className="flex flex-col gap-1.75">
          <h1 className="text-3xl font-extrabold">
            This is the title of the article
          </h1>
          <h2 className="text-lg text-muted-foreground leading-6">
            This is the subtitle of the article. This is the subtitle of the
            article.
          </h2>
        </div>
        <div className="flex gap-3 items-center mt-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
          <Link href={"/username"}>
            <p className="text-sm">Erdem Koyuncu</p>
          </Link>
          <Button variant={"outline"} className="rounded-full">
            Follow
          </Button>
        </div>
        <div className="flex gap-3 mt-5 text-muted-foreground">
          <Button
            variant={"ghost"}
            size={"lg"}
            className="rounded-full border-1 border-accent"
          >
            <Share />
            <p>Share</p>
          </Button>
          <Button
            variant={"ghost"}
            size={"lg"}
            className="rounded-full border-1 border-accent"
          >
            <Bookmark />
            <p>Save</p>
          </Button>
        </div>
        <div className="mt-8 min-h-screen border-b-1">ARTICLE CONTENT</div>
        <div className="flex flex-wrap gap-2 mt-10">
          <Button variant={"ghost"} className="rounded-full bg-accent">
            <p>Object Recognition</p>
          </Button>
          <Button variant={"ghost"} className="rounded-full bg-accent">
            <p>Software Engineering</p>
          </Button>
          <Button variant={"ghost"} className="rounded-full bg-accent">
            <p>Neuroscience</p>
          </Button>
          <Button variant={"ghost"} className="rounded-full bg-accent">
            <p>Linguistics</p>
          </Button>
        </div>
        <div className="flex justify-between text-muted-foreground text-[13px] mt-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center">
              <Button variant={"ghost"} className="rounded-full">
                <ThumbsUp size={18} />
                <p className="mt-0.5">3.1K</p>
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <Button variant={"ghost"} className="rounded-full">
                <MessageCircle size={18} />
                <p className="mt-0.5">221</p>
              </Button>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant={"ghost"} size={"icon"}>
              <Bookmark />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <Share />
            </Button>
          </div>
        </div>
        <div className="flex flex-col mt-12">
          <div className="flex justify-between items-center">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>EK</AvatarFallback>
            </Avatar>
            <Button variant={"outline"} size={"lg"} className="rounded-full">
              Follow
            </Button>
          </div>
          <div className="flex flex-col">
            {" "}
            <h2 className="text-xl mt-4">
              Written by
              <Link href={"/"}>
                {" "}
                <Button asChild variant={"link"} className="px-0">
                  <p className="text-xl">Erdem Koyuncu</p>
                </Button>
              </Link>
            </h2>
            <div className="flex gap-1.5 text-muted-foreground text-sm">
              <p>390 followers</p>
              <span>·</span>
              <p>123 following</p>
            </div>
          </div>
          <div className="border-b-1 mt-12" />
          <div className="flex flex-col mt-12">
            <h2 className="text-2xl font-semibold">Responses (22)</h2>
            <div className="flex flex-col">
              <div className="flex gap-3 items-center mt-8 mb-5">
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>EK</AvatarFallback>
                </Avatar>
                <span className="text-sm">Erdem Koyuncu</span>
              </div>
              <ArticleCommentInput />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
