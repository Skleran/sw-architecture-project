"use client";

import articles from "../app/(main)/mockup_articles.json";
import ProfileCard from "./profile-card";
import StaffPicksCard from "./ui/staff-picks-card";

interface UserData {
  name: string;
  imgSrc: string;
  followers: number;
}

export default function ProfileSidebar({ UserData }: { UserData: UserData }) {
  const randomArticles = [...articles]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <>
      <div className="min-w-[310px] border-l-1 ml-auto pl-10 flex flex-col gap-8 sticky top-20">
        <div className="w-[300px] flex flex-col">
          <ProfileCard UserData={UserData} />
        </div>
        <div className="w-[300px] flex flex-col">
          <h2 className="font-semibold text-base mb-4">Staff Picks</h2>
          <div className="w-full flex flex-col gap-6">
            {randomArticles.map((article, index) => (
              <StaffPicksCard key={index} data={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
