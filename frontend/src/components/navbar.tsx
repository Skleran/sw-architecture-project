"use client";

import { useState, useEffect } from "react";
// import { Button } from "./button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import ChangeThemeTabs from "./ui/theme-selector";
// import UserBox from "../custom/user-box";
// import api from "@/utils/api";
// import TransitionLink from "./ui/transition-link";

const Navbar = () => {
  interface Category {
    id: string;
    name: string;
  }
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 250);

      setIsAtTop(currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Mock categories - replace with actual API call when backend is ready
  useEffect(() => {
    const getMockCategories = async () => {
      try {
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock categories data
        const mockCategories = [
          { id: "1", name: "Login" },
          { id: "2", name: "Signup" },
          { id: "3", name: "Plans" },
          { id: "4", name: "Health" },
          { id: "5", name: "Business" },
        ];

        setCategories(mockCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getMockCategories();

    /* Commented out actual API call
    const getCategories = async () => {
      try {
        const response = await api.get("categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
    */
  }, []);

  const handleCategoryClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <motion.div
      className={`max-w-[95vw] px-4 mx-auto sticky top-0 z-10 flex h-16 shadow-lg rounded-full items-center border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/65 sm:flex sm:justify-between transition-transform duration-300 ${
        visible
          ? "translate-y-0 scale-100"
          : "-translate-y-[calc(100%+12px)] scale-85"
      }`}
      initial={initialRender ? { width: "1200px" } : {}}
      animate={{
        width: isAtTop ? "1200px" : "800px",
        top: isAtTop ? "0px" : "12px",

        transition: {
          duration: 0.3,
          ease: [0.24, 0.11, 0.26, 1],
        },
      }}
    >
      <div
        className={`relative flex items-center w-full justify-between sm:mx-2.5`}
      >
        <div className="flex items-center justify-between gap-3">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <Menu className="h-6 w-6 md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="">
              <SheetHeader className="pl-6">
                <Link
                  className="text-3xl font-serif tracking-tight"
                  href={"/"}
                  onClick={handleCategoryClick}
                >
                  Home
                </Link>
                <div className="w-full h-[1px] bg-accent" />
              </SheetHeader>
              <div>
                <p className="text-xl pl-6">Pages</p>
                <div className="w-[calc(100%-40px)] ml-6 h-[1px] mt-1 bg-accent" />
              </div>

              <div className="flex flex-col font-light gap-4 pl-9">
                {categories.length > 0
                  ? categories.map((category) => (
                      <Link
                        href={`/${category.name.toLowerCase()}`}
                        key={category.id}
                        onClick={handleCategoryClick}
                      >
                        {category.name}
                      </Link>
                    ))
                  : ""}
              </div>

              <div className="">
                <ChangeThemeTabs animationKey="change-theme" />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link
          href="/"
          className="absolute max-md:left-1/2 max-md:transform max-md:-translate-x-1/2"
        >
          <AnimatePresence mode="wait">
            {isAtTop ? (
              <motion.div
                key="fullName"
                initial={
                  initialRender ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-2xl font-serif tracking-tight h-7 "
              >
                ArticleWorm
              </motion.div>
            ) : (
              <motion.div
                key="initials"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-3xl font-serif tracking-[-0.125em] h-8.5"
              >
                AW
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <div className="text-g hidden flex-row gap-8 md:flex lg:gap-12">
          {categories.length > 0
            ? categories.map((category) => (
                <Link
                  href={`/${category.name.toLowerCase()}`}
                  key={category.id}
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  {category.name}
                </Link>
              ))
            : ""}
        </div>
        <div className="">
          <ChangeThemeTabs animationKey="change-theme" />
        </div>
        {/* <UserBox /> */}
      </div>
    </motion.div>
  );
};

export default Navbar;
