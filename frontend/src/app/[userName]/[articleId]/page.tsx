import { Metadata } from "next";

type Props = {
  params: Promise<{ userName: string; articleId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  // const name = (await params).userName;
  const id = (await params).articleId;
  return {
    title: `Article id: ${id}`,
  };
};

export default async function Article({ params }: Props) {
  const { userName, articleId } = await params;

  return (
    <>
      <h1>This is the article id: {articleId}</h1>
      <h1>This is the authors name: {userName}</h1>
    </>
  );
}
