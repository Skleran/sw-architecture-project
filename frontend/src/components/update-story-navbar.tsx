import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import ArticleTagSelector from "./article-category-selector";
import ProfilePopover from "./profile-popover";
import { Category, categoryApi } from "@/lib/categories";

export default function UpdateStoryNavbar({
  onSubmit,
}: {
  title: string;
  content: string;
  onSubmit: (categoryId: number) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  // const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    try {
      // setLoading(true);
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err) {
      console.log("Error occured while fetching categories: " + err);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mb-4 mx-6">
      <div className="w-full pt-4 pb-2 max-w-[1032px] mx-auto flex justify-between border-b-1">
        <div className="flex gap-3 items-center">
          <Link href={"/"} className="text-2xl font-serif tracking-tight h-7">
            ArticleWorm
          </Link>
          <div className="text-xs pt-1.5">Draft in User Name</div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="rounded-full">
                Publish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>Story Preview</DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="flex flex-col gap-6">
                <ArticleTagSelector
                  categories={categories}
                  value={selectedCategoryId}
                  onChange={(id) => setSelectedCategoryId(id)}
                />
                <Button
                  onClick={() => {
                    if (selectedCategoryId) {
                      onSubmit(Number(selectedCategoryId));
                    } else {
                      alert("Please select a category");
                    }
                  }}
                  className="rounded-full py-4.5"
                >
                  Publish Now
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <ProfilePopover />
        </div>
      </div>
    </div>
  );
}
