"use client";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "@/lib/categories";

interface TagSelectorProps {
  tags: Category[];
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags }) => {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsAtStart(container.scrollLeft <= 0);

    const isEnd =
      Math.ceil(container.scrollLeft + container.clientWidth) >=
      container.scrollWidth - 1;
    setIsAtEnd(isEnd);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();

    container.addEventListener("scroll", checkScrollPosition);

    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  return (
    <div className="relative flex justify-end w-[680px] max-w-screen px-2 mt-2">
      {/* left gradient */}
      <div
        className={`absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent z-2 pointer-events-none ${
          isAtStart ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      />

      {/* left button */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => scroll("left")}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-3 transition-opacity duration-300 ${
          isAtStart ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="size-6" strokeWidth={1} />
      </Button>

      {/* tags container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 hide-scrollbar w-full"
      >
        {tags.map((tag) => (
          <Link
            href={`/category/${tag.name}`}
            key={tag.id}
            className={`mx-4 py-4 cursor-pointer min-w-fit text-sm transition-colors hover:text-foreground/80 ${
              pathname === `/category/${tag.name}`
                ? "text-foreground border-b border-foreground"
                : "text-muted-foreground"
            }`}
          >
            {tag.name}
          </Link>
        ))}
      </div>

      {/* right gradient */}
      <div
        className={`absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent z-2 pointer-events-none ${
          isAtEnd ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      />

      {/* right button */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => scroll("right")}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-3 transition-opacity duration-300 ${
          isAtEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight className="size-6" strokeWidth={1} />
      </Button>
    </div>
  );
};

export default TagSelector;
