import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import FollowButton from "./ui/follow-button";

interface UserData {
  name: string;
  imgSrc: string;
  followers: number;
}

export default function ProfileCard({ UserData }: { UserData: UserData }) {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div>
          <Avatar className="size-22">
            <AvatarImage src={UserData.imgSrc} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full flex items-center">
          <div className="flex flex-col w-full gap-1">
            <h2 className="font-semibold text-base">{UserData.name}</h2>
            <p className="text-muted-foreground text-base">
              {UserData.followers} followers
            </p>
          </div>
          <FollowButton username={UserData.name} />
        </div>
      </div>
    </>
  );
}
