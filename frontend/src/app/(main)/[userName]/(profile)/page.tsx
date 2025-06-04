import ProfileArticleCard from "@/components/ui/profile-article-card";
// import articles from "../../mockup_articles.json";
import ProfileHeader from "@/components/profile-header";
import ProfileTagSelector from "@/components/profile-tag-selector";
import ProfileSidebar from "@/components/profile-sidebar";
import { userApi } from "@/lib/users";
import { articleApi } from "@/lib/articles";

export default async function User({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const userName = (await params).userName;
  console.log(userName);

  try {
    const userData = await userApi.getByName(userName);

    const articles = await articleApi.getByAuthor(userData.userId);

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
      <>
        <div className="w-full lg:w-[1200px] grid grid-cols-[1fr] lg:grid-cols-[2fr_1fr] ">
          <div className="flex flex-col mx-auto relative w-full items-center">
            <div className="w-full flex flex-col gap-1 max-w-[726px] justify-center absolute mt-6 lg:mt-10">
              <ProfileHeader UserData={transformedUserData} />
              <ProfileTagSelector tags={tags} />
            </div>
            <div className="mt-[210px] lg:mt-[176px] mx-6 lg:mx-0">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ProfileArticleCard key={article.id} data={article} />
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
      </>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    // Return 404 if user not found
    // notFound();
  }
}
