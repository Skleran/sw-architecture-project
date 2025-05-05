import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function User({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = await params;

  return (
    <>
      <h1>This is the profile of: {userName}</h1>
      <ul>
        <li>
          <Link href={`/${userName}/article-1`}>
            <Button variant="link">Go to article 1</Button>
          </Link>
        </li>
        <li>
          <Link href={`/${userName}/article-2`}>
            <Button variant="link">Go to article 2</Button>
          </Link>
        </li>
        <li>
          <Link href={`/${userName}/article-3`}>
            <Button variant="link">Go to article 3</Button>
          </Link>
        </li>
      </ul>
    </>
  );
}
