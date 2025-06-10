"use client";

import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { userApi } from "@/lib/users";
import { commentApi } from "@/lib/comments";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

type Props = {
  articleId: number;
};

type JwtPayload = {
  sub: string;
};

export default function ArticleCommentInput({ articleId }: Props) {
  const [content, setContent] = useState("");
  // const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    // console.log(token);

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const name = decoded.sub;
      if (name) {
        console.log(name);

        // setUserName(name);

        userApi.getByName(name).then((user) => {
          setUserId(user.userId);
        });
      }
    } catch (err) {
      console.log("Invalid token", err);
    }
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);
  const [hasText, setHasText] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaFocus = () => {
    setIsExpanded(true);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
    setContent(value);
    setHasText(value.length > 0);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setHasText(false);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  };

  const handleRespond = async () => {
    if (!hasText || !userId || !articleId) return;

    try {
      const newComment = await commentApi.create({
        userId,
        articleId,
        content,
      });
      console.log("Comment created:", newComment);
      toast.success("Comment created!");

      setContent("");
      if (textareaRef.current) {
        textareaRef.current.value = "";
        textareaRef.current.style.height = "auto";
      }
      setHasText(false);
      setIsExpanded(false);
    } catch (err) {
      console.log("Failed to create comment:", err);
    }
  };

  return (
    <div className="flex flex-col bg-accent rounded-lg">
      <div
        className={`transition-all duration-400
        ${isExpanded ? "px-1 py-2" : "py-1"}`}
      >
        <Textarea
          ref={textareaRef}
          placeholder="What are your thoughts?"
          className="w-full resize-none border-none outline-none focus-visible:ring-0 bg-transparent dark:bg-transparent"
          onFocus={handleTextareaFocus}
          onChange={handleTextareaChange}
        />
      </div>

      <div
        className={`
          ml-auto mr-2 overflow-hidden transition-all duration-400 ease-in-out
          ${isExpanded ? "max-h-16 opacity-100 pb-2" : "max-h-0 opacity-0 pb-0"}
        `}
      >
        <Button variant="ghost" className="rounded-full" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          className="rounded-full"
          onClick={handleRespond}
          disabled={!hasText}
        >
          Respond
        </Button>
      </div>
    </div>
  );
}
