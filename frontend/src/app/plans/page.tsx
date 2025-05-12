"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Plans() {
  const router = useRouter();

  const handleClick = () => {
    console.log("You are now a member!");
    router.push("/");
  };
  return (
    <>
      <h1 className="text-4xl font-semibold">Become a member</h1>
      <Button onClick={handleClick}>Pay</Button>
    </>
  );
}
