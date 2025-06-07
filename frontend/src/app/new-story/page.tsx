"use client";
import "@/styles/editor.css";

import NewStoryNavbar from "@/components/new-story-navbar";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articleApi } from "@/lib/articles";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { userApi } from "@/lib/users";

type JwtPayload = {
  sub: string;
};

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const username = decoded.sub;
      setUserName(username);
      if (username) {
        userApi.getByName(username).then((user) => {
          setUserId(user.userId);
        });
      }
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  const handleSubmit = async (categoryId: number) => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }
    if (userId === null) {
      alert("User not loaded yet.");
      return;
    }
    try {
      setLoading(true);
      const article = await articleApi.create({
        title,
        content,
        authorId: userId,
        categoryId,
      });

      console.log("Created article:", article);
      router.push(`/${userName}`);
    } catch (err) {
      console.log("Failed to create article:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pb-16">
        <NewStoryNavbar
          title={title}
          content={content}
          onSubmit={handleSubmit}
        />
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="max-w-[796px] mt-6 mb-4 mx-0 px-6 xs:px-12 bg-transparent dark:bg-transparent focus-visible:ring-0 place-self-center h-auto text-3xl md:text-4xl font-serif"
        />
        <SimpleEditor onContentChange={setContent} />
      </div>
    </>
  );
}
