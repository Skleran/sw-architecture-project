"use client";

import ArticleCommentInput from "@/components/article-comment-input";
import ArticleCommentsSection from "@/components/article-comments-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { articleApi } from "@/lib/articles";
import { userApi } from "@/lib/users";
import { Bookmark, MessageCircle, Share, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "@/styles/editor.css";
import ArticleReaction from "./article-reaction";

type Props = {
  userName: string;
  articleId: number;
};

export default function ArticleContent({ userName, articleId }: Props) {
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const article = await articleApi.getById(articleId);
        const user = await userApi.getByName(userName);
        setArticleData(article);
        setUserData(user);
      } catch (err: any) {
        setError("Failed to load article");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userName, articleId]);

  if (loading) return <div className="p-6">Loading article...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!articleData || !userData) return null;

  return (
    <div className="flex flex-col w-full mx-6 max-w-[680px] mt-6 mb-16 border-b pb-16">
      <div className="flex flex-col gap-1.75">
        <h1 className="text-3xl font-extrabold">{articleData.title}</h1>
        <h2 className="text-lg text-muted-foreground leading-6">
          This is the subtitle of the article.
        </h2>
      </div>

      <div className="flex gap-3 items-center mt-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>EK</AvatarFallback>
        </Avatar>
        <Link href={`/${userData.username}`}>
          <p className="text-sm">{userData.username}</p>
        </Link>
        <Button variant="outline" className="rounded-full">
          Follow
        </Button>
      </div>

      <div className="flex gap-3 mt-5 text-muted-foreground">
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full border-1 border-accent"
        >
          <Share />
          <p>Share</p>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full border-1 border-accent"
        >
          <Bookmark />
          <p>Save</p>
        </Button>
      </div>

      <article className="prose prose-stone dark:prose-invert mt-8 min-h-screen border-b-1 max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(articleData.content),
          }}
        />
      </article>

      <div className="flex justify-between flex-wrap gap-2 mt-10">
        <Link href={`/category/${articleData.category}`}>
          <Button variant="ghost" className="rounded-full bg-accent">
            <p>{articleData.category}</p>
          </Button>
        </Link>
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Bookmark />
          </Button>
          <Button variant="ghost" size="icon">
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
          <Button variant="outline" size="lg" className="rounded-full">
            Follow
          </Button>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl mt-4 space-x-1.5">
            <span>Written by</span>
            <Link href={`/${userData.username}`}>
              <Button asChild variant="link" className="px-0">
                <p className="text-xl">{userData.username}</p>
              </Button>
            </Link>
          </h2>
          <div className="flex gap-1.5 text-muted-foreground text-sm">
            <p>390 followers</p>
            <span>·</span>
            <p>123 following</p>
          </div>
        </div>

        <div className="border-b-1 mt-8 mb-4" />

        <div className="flex flex-col gap-2 mt-4">
          <p className="text-lg ml-2.75 font-semibold">React with emoji!</p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <ArticleReaction articleId={articleId} />
          </div>
        </div>

        <div className="border-b-1 mt-8 mb-2" />

        <div className="flex flex-col mt-12">
          <h2 className="text-2xl font-semibold">Responses (22)</h2>
          <div className="flex flex-col">
            <div className="flex gap-3 items-center mt-8 mb-5">
              <Avatar className="size-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>EK</AvatarFallback>
              </Avatar>
              <span className="text-sm">{userData.username}</span>
            </div>
            <ArticleCommentInput articleId={articleId} />
          </div>
        </div>

        <div className="border-b-1 mt-12" />

        <div className="flex flex-col mt-5">
          <ArticleCommentsSection id={articleId} />
        </div>
      </div>
    </div>
  );
}
