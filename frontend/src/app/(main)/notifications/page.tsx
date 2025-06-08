import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";

export default function Page() {
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
            <SquareArrowOutUpRight />
          </Button>
        </div>

        <div className="w-full flex flex-row px-4 items-center border-1 min-h-16 rounded-lg">
          <p className="w-full font-semibold">
            Your article got a new reaction
          </p>
          <Button className="w-fit" variant={"ghost"}>
            <SquareArrowOutUpRight />
          </Button>
        </div>

        <div className="w-full flex flex-row px-4 items-center border-1 min-h-16 rounded-lg">
          <p className="w-full font-semibold">
            Your article got a new reaction
          </p>
          <Button className="w-fit" variant={"ghost"}>
            <SquareArrowOutUpRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
