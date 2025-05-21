import HomeArticleCard from "@/components/ui/home-article-card";
import articles from "../../../mockup_articles.json";

export default function Home() {
  return (
    <>
      {articles.map((article, index) => (
        <HomeArticleCard key={index} data={article} />
      ))}
    </>
  );
}
