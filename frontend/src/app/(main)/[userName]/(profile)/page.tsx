"use client";
import { use } from "react";
import ProfileClient from "./profile-client";

export default function User({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = use(params);
  return <ProfileClient userName={userName} />;
}
