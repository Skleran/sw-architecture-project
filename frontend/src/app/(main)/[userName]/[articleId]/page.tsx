"use client";

import { use } from "react";
import ArticleContent from "./article-content";

type Props = {
  params: Promise<{ userName: string; articleId: string }>;
};

export default function ArticlePage(props: Props) {
  const { userName, articleId } = use(props.params);

  return <ArticleContent userName={userName} articleId={Number(articleId)} />;
}
