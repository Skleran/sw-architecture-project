"use client";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import ChangeThemeTabs from "./ui/theme-selector";
import { UserRound } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type JwtPayload = {
  sub: string;
};

export default function ProfilePopover() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const username = decoded.sub;
      setUserName(username);
      // if (username) {
      //   userApi.getByName(username).then((user) => {
      //     setUserId(user.userId);
      //   });
      // }
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("auth_token"); // Remove token
    router.push("/login"); // Redirect
  };

  return (
    <>
      <Popover>
        <PopoverTrigger className="hover:cursor-pointer hover:brightness-90">
          <Avatar className="size-9 flex items-center justify-center">
            <UserRound />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-60 max-w-60">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-5 border-b-1 pb-4 max-w-full">
              <div className="flex flex-col items-start">
                <Link href={`/${userName}`}>
                  <Button variant={"link"} className="p-0 m-0 h-fit max-w-full">
                    <p className="truncate max-w-[70px] text-lg">{userName}</p>
                  </Button>
                </Link>
              </div>
              <ChangeThemeTabs animationKey="change-theme" />
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <Link
                href={"/new-story"}
                className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Write
              </Link>
              <div className="border-b-1" />
              <Link
                href={`/${userName}`}
                className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Profile
              </Link>
              <Link
                href={"/plans"}
                className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Become a member
              </Link>
              <div className="border-b-1" />
              <button
                onClick={handleSignOut}
                className="text-left text-sm text-foreground/60 transition-colors hover:text-destructive/80 hover:cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
