"use client";

import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function ArticleCommentInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasText, setHasText] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaFocus = () => {
    setIsExpanded(true);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
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

  const handleRespond = () => {
    // Add your response logic here
    console.log("Response submitted");
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
    setHasText(false);
    setIsExpanded(false); // Optional: collapse after responding
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
        <Button variant="link" className="rounded-full" onClick={handleCancel}>
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
