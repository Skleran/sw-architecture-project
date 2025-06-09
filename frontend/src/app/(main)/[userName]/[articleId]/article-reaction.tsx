"use client";

import { Button } from "@/components/ui/button";
import { Angry, Frown, Heart, Laugh, Smile } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { reactionApi, ReactionType } from "@/lib/reactions";
import { jwtDecode } from "jwt-decode";
import { userApi } from "@/lib/users";
import { notificationApi } from "@/lib/notifications";

type Props = {
  articleId: number;
  authorId: number;
};

type JwtPayload = {
  sub: string;
};

const reactionIcons: Record<ReactionType, JSX.Element> = {
  LOVE: <Heart className="size-6.5" />,
  FUNNY: <Laugh className="size-6.5" />,
  LIKE: <Smile className="size-6.5" />,
  DISLIKE: <Frown className="size-6.5" />,
  SAD: <Angry className="size-6.5" />,
  SUPPORT: <></>, // not used
};

const reactionOrder: ReactionType[] = [
  "LOVE",
  "FUNNY",
  "LIKE",
  "DISLIKE",
  "SAD",
];

const reactionMessages: Record<ReactionType, string> = {
  LOVE: "Your article got a new love reaction!",
  FUNNY: "Your article got a new funny reaction!",
  LIKE: "Your article got a new like!",
  DISLIKE: "Your article got a new dislike!",
  SAD: "Your article got a new sad reaction!",
  SUPPORT: "Your article got a new support reaction!",
};

export default function ArticleReaction({ articleId, authorId }: Props) {
  const [userId, setUserId] = useState<number | null>(null);
  const [userReacted, setUserReacted] = useState<ReactionType | null>(null);
  const [reactionCounts, setReactionCounts] = useState<
    Record<ReactionType, number>
  >({
    LOVE: 0,
    FUNNY: 0,
    LIKE: 0,
    DISLIKE: 0,
    SAD: 0,
    SUPPORT: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const username = decoded.sub;
      if (username) {
        userApi.getByName(username).then((user) => {
          setUserId(user.userId);
        });
      }
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchReactions = async () => {
      try {
        const reactions = await reactionApi.getByArticle(articleId);

        const counts: Record<ReactionType, number> = {
          LOVE: 0,
          FUNNY: 0,
          LIKE: 0,
          DISLIKE: 0,
          SAD: 0,
          SUPPORT: 0,
        };

        let userReactionType: ReactionType | null = null;

        for (const reaction of reactions) {
          const type = reaction.reactionType as ReactionType;
          counts[type]++;

          if (reaction.user.userId === userId) {
            userReactionType = type;
          }
        }

        setReactionCounts(counts);
        setUserReacted(userReactionType);
      } catch (err) {
        console.error("Failed to fetch reactions:", err);
      }
    };

    fetchReactions();
  }, [userId, articleId]);

  const handleReact = async (type: ReactionType) => {
    if (!userId || submitting || userReacted) return;

    setSubmitting(true);
    try {
      await reactionApi.create({
        type,
        userId,
        articleId,
      });

      setReactionCounts((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
      setUserReacted(type);

      await notificationApi.create({
        message: reactionMessages[type],
        type,
        userId: 39,
        articleId,
      });
    } catch (err) {
      console.error("Reaction failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // const handleNotification

  return (
    <div className="flex flex-row gap-1">
      {reactionOrder.map((type) => (
        <Button
          key={type}
          className={`flex flex-col h-auto ${
            userReacted === type ? "text-primary brightness-200 font-bold" : ""
          }`}
          variant="ghost"
          disabled={!!userReacted}
          onClick={() => handleReact(type)}
        >
          {reactionIcons[type]}
          <p className="text-xs">{reactionCounts[type]}</p>
        </Button>
      ))}
    </div>
  );
}
