"use client";

import HomeArticleCard from "@/components/ui/home-article-card";
import { use, useEffect, useState } from "react";
import { Article, articleApi } from "@/lib/articles";
import { extractFirstImageSrc } from "@/lib/get-first-image";

type Props = {
  params: Promise<{ category: string }>;
};

export default function Home(props: Props) {
  const { category } = use(props.params);
  const [articles, setArticles] = useState<Article[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  const fetchArticles = async () => {
    try {
      // setLoading(true);
      const data = await articleApi.getByCategory(category);
      const enriched = data.map((a: Article) => ({
        ...a,
        coverImage: extractFirstImageSrc(a.content),
      }));
      setArticles(enriched);
    } catch (err) {
      console.log("Error occured while fetching articles: " + err);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, [category]);
  return (
    <>
      {articles.map((article, index) => (
        <HomeArticleCard key={index} data={article} />
      ))}
    </>
  );
}
