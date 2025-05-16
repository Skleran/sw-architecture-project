"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const tabs = [
  { id: "light", icon: <Sun className="h-4 w-4" /> },
  { id: "system", icon: <Monitor className="h-4 w-4" /> },
  { id: "dark", icon: <Moon className="h-4 w-4" /> },
];

export default function ChangeThemeTabs({
  animationKey = "change-theme",
}: {
  animationKey: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (theme) {
      setActiveTab(theme);
    }
  }, [theme]);

  const toggleTheme = async (id: string) => {
    if (!ref.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(id);
      });
    }).ready;
  };

  return (
    <div
      className="inline-flex space-x-1 border rounded-full dark:border-neutral-800 p-1"
      ref={ref}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => toggleTheme(tab.id)}
          aria-label={"changeTheme"}
          className={cn(
            "relative hover:cursor-pointer rounded-full p-2 text-sm font-medium text-black dark:text-white outline-sky-400 focus-visible:outline-2 z-[20] hover:bg-black/15 dark:hover:bg-white/15 transition-all duration-300",
            activeTab === tab.id && "text-white dark:text-black"
          )}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId={animationKey}
              className="absolute inset-0 z-[-1] bg-black dark:bg-white rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="z-[30]">{tab.icon}</span>
        </button>
      ))}
    </div>
  );
}

export function ChangeThemeTabsLight({
  animationKey = "change-theme",
}: {
  animationKey: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (theme) {
      setActiveTab(theme);
    }
  }, [theme]);

  const toggleTheme = async (id: string) => {
    if (!ref.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(id);
      });
    }).ready;
  };

  return (
    <div
      className="inline-flex space-x-1 border rounded-full dark:border-neutral-800 p-1"
      ref={ref}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => toggleTheme(tab.id)}
          aria-label={"changeTheme"}
          className={cn(
            "relative rounded-full p-2 text-sm font-medium text-black dark:text-white outline-sky-400 focus-visible:outline-2 z-[20] hover:bg-neutral-100 dark:hover:bg-white/15 transition-all duration-300",
            activeTab === tab.id && "text-white dark:text-black"
          )}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId={animationKey}
              className="absolute inset-0 z-[-1] bg-gradient-to-r from-secondary-bg to-dark-blue dark:bg-none dark:bg-white rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="z-[30]">{tab.icon}</span>
        </button>
      ))}
    </div>
  );
}
