"use client";

import WhoToFollowCard from "./ui/who-to-follow-card";
import StaffPicksCard from "./ui/staff-picks-card";

export default function Sidebar() {
  return (
    <>
      <div className="min-w-[310px] border-l-1 ml-auto pl-10 flex flex-col gap-8 sticky top-20">
        <div className=" w-[300px] flex flex-col">
          <h2 className="font-semibold text-base mb-4">Staff Picks</h2>
          <div className="w-full flex flex-col gap-6">
            <StaffPicksCard />
          </div>
        </div>

        <div className="w-[300px] flex flex-col">
          <h2 className="font-semibold text-base mb-4">Who to follow</h2>
          <div className="w-full flex flex-col">
            <WhoToFollowCard />
          </div>
        </div>
      </div>
    </>
  );
}
