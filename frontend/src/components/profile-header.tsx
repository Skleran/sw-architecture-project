import { Button } from "./ui/button";
import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserData {
  name: string;
  imgSrc: string;
  followers: number;
}

export default function ProfileHeader({ UserData }: { UserData: UserData }) {
  return (
    <>
      <div className="px-6 h-30 lg:h-16 w-full flex flex-col gap-5">
        <div className="w-full flex">
          <div className="w-full flex gap-5">
            <div className="lg:hidden">
              <Avatar className="size-12">
                <AvatarImage src={UserData.imgSrc} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="font-semibold text-2xl lg:text-5xl tracking-tight">
                {UserData.name}
              </h2>
              <p className="text-muted-foreground text-base lg:hidden">
                {UserData.followers} followers
              </p>
            </div>
          </div>
          <div>
            <Button size={"icon"} variant={"ghost"}>
              <Ellipsis />
            </Button>
          </div>
        </div>
        <div className="lg:hidden">
          <Button variant={"default"} className="rounded-full w-full p-5">
            Follow
          </Button>
        </div>
      </div>
    </>
  );
}
