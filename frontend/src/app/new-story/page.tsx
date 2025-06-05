"use client";

import NewStoryNavbar from "@/components/new-story-navbar";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articleApi } from "@/lib/articles";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }
    try {
      setLoading(true);

      const authorId = 38;
      const categoryId = 1;

      const article = await articleApi.create({
        title,
        content,
        authorId,
        categoryId,
      });

      console.log("Created article:", article);
    } catch (err) {
      console.log("Failed to create article:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pb-16">
        <NewStoryNavbar />
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="max-w-[796px] mt-6 mb-4 mx-0 px-6 xs:px-12 bg-transparent dark:bg-transparent focus-visible:ring-0 place-self-center h-auto text-3xl md:text-4xl font-serif"
        />
        <SimpleEditor onContentChange={setContent} />
      </div>

      <div className="mt-6 px-6">
        <Button onClick={handleSubmit} disabled={loading} className="">
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </>
  );
}
