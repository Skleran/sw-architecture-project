"use client";

import { useEffect, useState } from "react";
import { User, userApi } from "@/lib/users";
import { articleApi, Article } from "@/lib/articles";
import ProfileHeader from "@/components/profile-header";
import ProfileTagSelector from "@/components/profile-tag-selector";
import ProfileSidebar from "@/components/profile-sidebar";
import ProfileArticleCard from "@/components/ui/profile-article-card";

interface Props {
  userName: string;
}

export default function ProfileClient({ userName }: Props) {
  const [userData, setUserData] = useState<User>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await userApi.getByName(userName);
        const fetchedArticles = await articleApi.getByAuthor(user.userId);
        setUserData(user);
        setArticles(fetchedArticles);
      } catch (err) {
        console.error("Failed to fetch user or articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userName]);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>User not found</div>;

  const tags = [
    { id: "1", name: "Home", slug: "" },
    { id: "2", name: "About", slug: "about" },
  ];

  const transformedUserData = {
    name: userData.username,
    imgSrc: "https://randomuser.me/api/portraits/lego/2.jpg",
    followers: 31,
    email: userData.email,
    role: userData.role,
    userId: userData.userId,
  };

  return (
    <div className="w-full lg:w-[1200px] grid grid-cols-[1fr] lg:grid-cols-[2fr_1fr] ">
      <div className="flex flex-col mx-auto relative w-full items-center">
        <div className="w-full flex flex-col gap-1 max-w-[726px] justify-center absolute mt-6 lg:mt-10">
          <ProfileHeader UserData={transformedUserData} />
          <ProfileTagSelector tags={tags} />
        </div>
        <div className="mt-[210px] lg:mt-[176px] mx-6 lg:mx-0">
          {articles.length > 0 ? (
            articles.map((article: Article) => (
              <ProfileArticleCard
                key={article.id}
                data={{ ...article, name: userName }}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No articles found for this user.
            </div>
          )}
        </div>
      </div>
      <div className="flex-col gap-4 hidden lg:flex mt-6">
        <ProfileSidebar UserData={transformedUserData} />
      </div>
    </div>
  );
}
