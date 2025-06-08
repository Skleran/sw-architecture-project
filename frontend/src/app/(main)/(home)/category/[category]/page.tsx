"use client";

import HomeArticleCard from "@/components/ui/home-article-card";
import { use, useEffect, useState } from "react";
import { Article, articleApi } from "@/lib/articles";

type Props = {
  params: Promise<{ category: string }>;
};

export default function Home(props: Props) {
  const { category } = use(props.params);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await articleApi.getByCategory(category);

      setArticles(data);
    } catch (err) {
      console.log("Error occured while fetching articles: " + err);
    } finally {
      setLoading(false);
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
