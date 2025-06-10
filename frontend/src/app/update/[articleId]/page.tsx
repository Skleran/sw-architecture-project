"use client";
import "@/styles/editor.css";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Input } from "@/components/ui/input";
import { articleApi } from "@/lib/articles";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { userApi } from "@/lib/users";
import { toast } from "sonner";
import UpdateStoryNavbar from "@/components/update-story-navbar";
import DOMPurify from "dompurify";

type JwtPayload = {
  sub: string;
};

type Props = {
  params: Promise<{ articleId: number }>;
};

export default function Page(props: Props) {
  const { articleId } = use(props.params);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [loading, setLoading] = useState(false);
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
      if (articleId) {
        articleApi.getById(articleId).then((article) => {
          const sanitized = DOMPurify.sanitize(article.content);
          setContent(sanitized);
          setTitle(article.title);
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
      // setLoading(true);
      const article = await articleApi.update({
        title,
        content,
        categoryId,
        articleId,
      });

      router.push(`/${userName}/${articleId}`);
      toast.success("Article updated successfully.");
    } catch (err) {
      console.log("Failed to update article:", err);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <div className="pb-16">
        <UpdateStoryNavbar
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
        <SimpleEditor onContentChange={setContent} content={content} />
      </div>
    </>
  );
}
