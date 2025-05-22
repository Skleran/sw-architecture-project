"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface TagSelectorProps {
  tags: Tag[];
}

const ProfileTagSelector: React.FC<TagSelectorProps> = ({ tags }) => {
  const pathname = usePathname();

  // Extract author name from pathname
  // Assumes URL structure: /author-name or /author-name/about
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  const authorName = pathSegments[0] || "";

  // Function to build the correct href for each tag
  const buildHref = (tagSlug: string) => {
    if (!authorName) return "/"; // Fallback to home if no author name

    if (tagSlug === "") {
      return `/${authorName}`; // For the main profile page
    } else {
      return `/${authorName}/${tagSlug}`; // For sub-pages like about
    }
  };

  // Function to check if current tag is active
  const isActive = (tagSlug: string) => {
    if (tagSlug === "") {
      // For home tag, active when pathname is exactly /author-name
      return pathname === `/${authorName}`;
    } else {
      // For other tags, active when pathname matches /author-name/slug
      return pathname === `/${authorName}/${tagSlug}`;
    }
  };

  return (
    <div className="relative flex justify-end w-[680px] max-w-screen px-2 mt-2">
      <div className="flex overflow-x-auto gap-4 hide-scrollbar w-full">
        {tags.map((tag) => (
          <Link
            href={buildHref(tag.slug)}
            key={tag.id}
            className={`mx-4 py-4 cursor-pointer min-w-fit text-sm transition-colors hover:text-foreground/80 ${
              isActive(tag.slug)
                ? "text-foreground border-b border-foreground"
                : "text-muted-foreground"
            }`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileTagSelector;
