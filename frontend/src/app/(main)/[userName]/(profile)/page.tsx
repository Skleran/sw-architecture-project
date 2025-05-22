import ProfileArticleCard from "@/components/ui/profile-article-card";
import articles from "../../mockup_articles.json";

export default async function User() {
  return (
    <>
      {articles.map((article, index) => (
        <ProfileArticleCard key={index} data={article} />
      ))}
    </>
  );
}
