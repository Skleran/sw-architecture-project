import HomeArticleCard from "@/components/ui/home-article-card";
import articles from "./mockup_articles.json";

export default function Home() {
  return (
    <>
      <div className="w-full lg:w-[1200px] mx-6 grid grid-cols-[1fr] lg:grid-cols-[2fr_1fr] ">
        <div className="flex flex-col">
          {articles.map((article, index) => (
            <HomeArticleCard key={index} data={article} />
          ))}
        </div>
        <div className="flex-col gap-4 border-2 border-blue-600/30 hidden lg:flex"></div>
      </div>
    </>
  );
}
