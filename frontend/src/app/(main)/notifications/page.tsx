"use client";

import { Button } from "@/components/ui/button";
import { Notification, notificationApi } from "@/lib/notifications";
import { userApi } from "@/lib/users";
import { jwtDecode } from "jwt-decode";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type JwtPayload = {
  sub: string;
};

type FilterType = "all" | "unread" | "read";

export default function Page() {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<FilterType>("unread");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const username = decoded.sub;
      if (username) {
        setUsername(username);
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
        const data = await notificationApi.getNotificationsApi(userId);
        setNotifications(data);

        const unreadNotifications = data.filter((n) => !n.read);

        await Promise.all(
          unreadNotifications.map((n) =>
            notificationApi
              .read(n.notificationId)
              .catch((err) => console.error("Failed to mark as read", err))
          )
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, [userId]);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
  });

  return (
    <div className="flex flex-col w-full mx-6 max-w-[900px] mt-6 mb-16">
      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-5">
          <Button
            className="rounded-full w-26"
            variant={filter === "unread" ? "default" : "secondary"}
            onClick={() => setFilter("unread")}
          >
            Unread
          </Button>
          <Button
            className="rounded-full w-26"
            variant={filter === "read" ? "default" : "secondary"}
            onClick={() => setFilter("read")}
          >
            Read
          </Button>
          <Button
            className="rounded-full w-26"
            variant={filter === "all" ? "default" : "secondary"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-1 mt-5 p-3 rounded-xl">
        {filteredNotifications.length === 0 && (
          <p className="text-center text-muted-foreground">No notifications</p>
        )}

        {filteredNotifications.map((notification) => (
          <div
            key={notification.notificationId}
            className={`w-full flex flex-row px-4 items-center border-1 min-h-16 rounded-lg ${
              notification.read ? "text-muted-foreground/60" : ""
            }`}
          >
            <p className="w-full font-semibold">
              {notification.message} {notification.notificationId}
            </p>
            {username && (
              <Link href={`/${username}/${notification.articleId}`}>
                <Button
                  className="w-fit"
                  variant={notification.read ? "ghost" : "ghost"}
                >
                  <SquareArrowOutUpRight className="size-4.5" />
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
