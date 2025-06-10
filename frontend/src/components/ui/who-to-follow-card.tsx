import Link from "next/link";
import { Button } from "./button";

export default function WhoToFollowCard() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <Link href={"/ozlemnurduman"} className="flex gap-1.5">
            <div className="flex flex-col justify-center gap-1">
              <h2 className="text-base font-semibold mb-0.5">ozlemnurduman</h2>
            </div>
          </Link>
          <Button variant={"outline"} className="rounded-full">
            Follow
          </Button>
        </div>
        <div className="flex gap-4">
          <Link href={"/erdemkoyuncu"} className="flex gap-1.5">
            <div className="flex flex-col justify-center gap-1">
              <h2 className="text-base font-semibold mb-0.5">erdemkoyuncu</h2>
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
