"use client";

import { Button } from "@/components/ui/button";
import { notificationApi } from "@/lib/notifications";
import { userApi } from "@/lib/users";
import { jwtDecode } from "jwt-decode";
import { SquareArrowOutUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";

type JwtPayload = {
  sub: string;
};

export default function Page() {
  const [userId, setUserId] = useState<number | null>(null);

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

    const fetchNotifications = async () => {
      try {
        const notifications = await notificationApi.getNotificationsApi(userId);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div className="flex flex-col w-full mx-6 max-w-[900px] mt-6 mb-16">
      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-5">
          <Button className="rounded-full w-26" variant={"default"}>
            Unread
          </Button>
          <Button className="rounded-full w-26" variant={"secondary"}>
            Read
          </Button>
          <Button className="rounded-full w-26" variant={"secondary"}>
            All
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-1 mt-5 p-3 rounded-xl min-h-50">
        <div className="w-full flex flex-row px-4 items-center border-1 min-h-16 rounded-lg">
          <p className="w-full font-semibold">
            Your article got a new reaction
          </p>
          <Button className="w-fit" variant={"ghost"}>
            <SquareArrowOutUpRight className="size-4.5" />
          </Button>
        </div>

        <div className="w-full flex flex-row px-4 items-center border-1 min-h-16 rounded-lg">
          <p className="w-full font-semibold">
            Your article got a new reaction
          </p>
          <Button className="w-fit" variant={"ghost"}>
            <SquareArrowOutUpRight className="size-4.5" />
          </Button>
        </div>

        <div className="w-full flex flex-row px-4 items-center border-1 min-h-16 rounded-lg">
          <p className="w-full font-semibold text-muted-foreground/50">
            Your article got a new reaction
          </p>
          <Button className="w-fit text-muted-foreground/50" variant={"ghost"}>
            <SquareArrowOutUpRight className="size-4.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
