import ArticleContent from "./article-content";

type Props = {
  params: { userName: string; articleId: number }; // note: comes as string
};

export default function ArticlePage({ params }: Props) {
  const articleId = Number(params.articleId);

  return <ArticleContent userName={params.userName} articleId={articleId} />;
}
