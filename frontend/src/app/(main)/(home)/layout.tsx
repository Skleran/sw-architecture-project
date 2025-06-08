"use client";

import Sidebar from "@/components/sidebar";
import TagSelector from "@/components/tag-selector";
import { Category, categoryApi } from "@/lib/categories";
import { useEffect, useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (err) {
      console.log("Error occured while fetching categories: " + err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-full lg:w-[1200px] grid grid-cols-[1fr] lg:grid-cols-[2fr_1fr] ">
        <div className="flex flex-col relative">
          <div className="w-full flex justify-center absolute">
            <TagSelector tags={categories} />
          </div>
          <div className="mx-6 mt-[61px]">{children}</div>
        </div>
        <div className="flex-col gap-4 hidden lg:flex mt-6">
          <Sidebar />
        </div>
      </div>
    </>
  );
}
