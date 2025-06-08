"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { jwtDecode } from "jwt-decode";
import { userApi } from "@/lib/users";
import { followApi } from "@/lib/follow";

type JwtPayload = {
  sub: string;
};

type Props = {
  username: string;
};

export default function FollowButton({ username }: Props) {
  const [userId, setUserId] = useState<number | null>(null);
  const [following, setFollowing] = useState<boolean>(false);

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

    const fetchFollowings = async () => {
      try {
        const followings = await followApi.getFollowingsById(userId);

        const isFollowing = followings.some(
          (follower: { username: string }) => follower.username === username
        );

        setFollowing(isFollowing);
      } catch (err) {
        console.error("Failed to fetch followings", err);
      }
    };

    fetchFollowings();
  }, [userId, username]);

  const handleFollow = async () => {
    if (!userId) return;

    try {
      const targetUser = await userApi.getByName(username);
      const followingId = targetUser.userId;

      await followApi.create({
        followingId,
        userId,
      });

      setFollowing(true);
    } catch (err) {
      console.error("Couldn't follow: ", err);
    }
  };

  return (
    <Button
      variant="secondary"
      className="rounded-full"
      onClick={!following ? handleFollow : undefined}
    >
      {following ? "Following" : "Follow"}
    </Button>
  );
}
