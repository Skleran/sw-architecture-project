"use client";

import ArticleCommentInput from "@/components/article-comment-input";
import ArticleCommentsSection from "@/components/article-comments-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Article, articleApi } from "@/lib/articles";
import { User, userApi } from "@/lib/users";
import { Share } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "@/styles/editor.css";
import ArticleReaction from "./article-reaction";
import FollowButton from "@/components/ui/follow-button";
import { jwtDecode } from "jwt-decode";

type Props = {
  userName: string;
  articleId: number;
};

type JwtPayload = {
  sub: string;
};

export default function ArticleContent({ userName, articleId }: Props) {
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState<Article | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loggedInUserName, setLoggedInUserName] = useState<string | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const username = decoded.sub;
      setLoggedInUserName(username);

      if (username) {
        userApi.getByName(username).then((user) => {
          setLoggedInUserId(user.userId);
        });
      }
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const article = await articleApi.getById(articleId);
        const user = await userApi.getByName(userName);
        setArticleData(article);
        setUserData(user);
      } catch (err) {
        setError("Failed to load article");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userName, articleId]);

  useEffect(() => {
    if (articleData && loggedInUserId) {
      setIsAuthor(articleData.authorId === loggedInUserId);
    }
  }, [articleData, loggedInUserId]);

  if (loading) return <div className="p-6">Loading article...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!articleData || !userData) return null;

  const handleShare = async () => {
    const shareData = {
      title: articleData.title,
      text: `Check out this article: ${articleData.title}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (error) {
        alert(`Copy this link: ${window.location.href}`);
      }
    }
  };

  return (
    <div className="flex flex-col w-full mx-6 max-w-[680px] mt-6 mb-16 border-b pb-16">
      <div className="flex flex-col gap-1.75">
        <h1 className="text-3xl font-extrabold">{articleData.title}</h1>
      </div>

      <div className="flex gap-3 items-center mt-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>EK</AvatarFallback>
        </Avatar>
        <Link href={`/${userData.username}`}>
          <p className="text-sm">{userData.username}</p>
        </Link>
        <FollowButton username={userData.username} />
      </div>

      <div className="flex justify-between gap-3 mt-5 text-muted-foreground">
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full border-1 border-accent"
          onClick={handleShare}
        >
          <Share />
          <p>Share</p>
        </Button>

        {/* Show this button if user is the author of the viewed article */}
        {isAuthor && (
          <Link href={`/update/${articleId}`}>
            <Button
              variant="default"
              size="lg"
              className="rounded-full border-1 border-accent"
            >
              Update Article
            </Button>
          </Link>
        )}
      </div>

      <article className="prose prose-stone dark:prose-invert mt-8 min-h-[50vh] border-b-1 max-w-none">
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
          <Button variant="ghost" size="icon" onClick={handleShare}>
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
          <FollowButton username={userData.username} />
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
            <ArticleReaction
              articleId={articleId}
              authorId={articleData.authorId}
            />
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
