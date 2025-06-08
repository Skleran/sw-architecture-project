import React, { useEffect, useState } from "react";
import ArticleComment from "./ui/article-comment";
import { Comment, commentApi } from "@/lib/comments";

type Props = {
  id: number;
};

export default function ArticleCommentsSection({ id }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // setLoading(true);
        const data = await commentApi.getByArticle(id);
        setComments(data);
      } catch (err) {
        console.error(err);
      } finally {
        // setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  return (
    <div>
      {comments.map((comment) => (
        <ArticleComment
          key={comment.id}
          userName={comment.userName}
          content={comment.content}
          id={comment.id}
        />
      ))}
      {comments.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          No comments found.
        </div>
      )}
    </div>
  );
}
