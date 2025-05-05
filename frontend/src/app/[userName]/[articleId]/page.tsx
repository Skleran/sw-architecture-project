export default async function Article({
  params,
}: {
  params: Promise<{ userName: string; articleId: string }>;
}) {
  const { userName, articleId } = await params;

  return (
    <>
      <h1>This is the article id: {articleId}</h1>
      <h1>This is the authors name: {userName}</h1>
    </>
  );
}
