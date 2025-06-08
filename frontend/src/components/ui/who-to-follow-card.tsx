import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";

export default function WhoToFollowCard() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Link href={"/erdem-koyuncu"} className="flex gap-1.5">
            <Avatar className="mt-0.5">
              <AvatarImage
                src={"https://github.com/shadcn.png"}
                alt="@shadcn"
                className="hover:brightness-90"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold">Erdem Koyuncu</h2>
              <p className="text-[13px] text-muted-foreground line-clamp-2">
                Full Stack Developer | Angular &amp; MEAN Stack Specialist |
                MEAN Stack Developer | Blogger | Open to Collaboration Author of
                &quot;Code &amp; Coffee: A Developer&apos;s Journey&quot;
              </p>
            </div>
          </Link>
          <Button variant={"outline"} className="rounded-full">
            Follow
          </Button>
        </div>
      </div>
    </>
  );
}
