"use client";

import HomeArticleCard from "@/components/ui/home-article-card";
import { useEffect, useState } from "react";
import { Article, articleApi } from "@/lib/articles";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  const fetchArticles = async () => {
    try {
      // setLoading(true);
      const data = await articleApi.getAll();
      setArticles(data);
    } catch (err) {
      console.log("Error occured while fetching articles: " + err);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      {articles.map((article, index) => (
        <HomeArticleCard key={index} data={article} />
      ))}
    </>
  );
}
