"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import { motion } from "framer-motion";

interface TOCContextType {
  registerSection: (id: string, title: string) => void;
  activeSection: string | null;
  setActiveSection: (id: string) => void;
  sections: { id: string; title: string }[];
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export const TOCProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const registerSection = (id: string, title: string) => {
    setSections((prev) => {
      if (prev.some((section) => section.id === id)) return prev;
      return [...prev, { id, title }];
    });

    if (activeSection === null) {
      setActiveSection(id);
    }
  };

  return (
    <TOCContext.Provider
      value={{ registerSection, activeSection, setActiveSection, sections }}
    >
      {children}
    </TOCContext.Provider>
  );
};

const useTOC = () => {
  const context = useContext(TOCContext);
  if (context === undefined) {
    throw new Error("useTOC must be used within a TOCProvider");
  }
  return context;
};

interface TOCHeaderProps {
  id: string;
  children: ReactNode;
}

export const TOCHeader: React.FC<TOCHeaderProps> = ({ id, children }) => {
  const { registerSection } = useTOC();

  useEffect(() => {
    if (typeof children === "string") {
      registerSection(id, children);
    } else {
      const text = React.Children.toArray(children)
        .filter((child) => typeof child === "string")
        .join(" ");
      registerSection(id, text || id);
    }
  }, [id, children, registerSection]);

  return (
    <h2 id={id} className="text-3xl !font-extrabold my-4 scroll-mt-20">
      {children}
    </h2>
  );
};

export const TOCContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="my-2 min-h-32 text-xl leading-[1.65] !font-[400]">
      {children}
    </div>
  );
};

interface SideNavigationProps {
  children: ReactNode;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({ children }) => {
  const { activeSection, setActiveSection, sections } = useTOC();
  const [isAtTop, setIsAtTop] = useState(true);
  const [hover, setHover] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const [initialHeight, setInitialHeight] = useState<number | null>(null);

  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const midpoint = viewportHeight / 2;
      let newActiveSection = activeSection;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= midpoint && rect.bottom >= midpoint) {
            newActiveSection = section.id;
          }

          if (index >= 0 && rect.bottom < midpoint && sections[index]) {
            newActiveSection = sections[index].id;
          }
        }
      });

      if (newActiveSection && newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, setActiveSection, activeSection]);

  const navigateToSection = (id: string) => {
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 64;
      const startPosition = window.scrollY;
      const distance = top - startPosition;
      const duration = 600;
      let startTime: number | null = null;

      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const scrollAnimation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutQuad(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(scrollAnimation);
        } else {
          window.scrollTo(0, top);
          // window.history.replaceState(null, "", `#${id}`);
        }
      };

      requestAnimationFrame(scrollAnimation);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsAtTop(currentScrollPos < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [heightCaptured, setHeightCaptured] = useState(false);

  useEffect(() => {
    if (heightCaptured && innerRef.current && initialHeight === null) {
      setInitialHeight(innerRef.current.offsetHeight);
      setHeightCaptured(true);
    }
  }, [initialHeight]);

  useEffect(() => {
    if (!heightCaptured) {
      // adjust timeout if height capture is not working properly
      // I dont think its the best solution, should be possible to handle better
      const timer = setTimeout(() => {
        if (innerRef.current) {
          setInitialHeight(innerRef.current.offsetHeight);
          setHeightCaptured(true);
        }
      }, 1);

      return () => clearTimeout(timer);
    }
  }, [heightCaptured]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="grid-cols-1 lg:w-[1200px] mt-16 grid lg:grid-cols-[1fr_680px_1fr] grid-rows-auto auto-cols-fr gap-4 items-start relative">
        <div
          className="justify-start items-start w-[200px] max-w-[200px] max-h-[100vh] pt-3 sticky top-12 hidden lg:flex"
          style={{ minHeight: initialHeight ?? "auto" }}
        >
          <motion.div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            ref={innerRef}
            animate={{
              x: isAtTop ? 0 : `calc(-1*(100vw - 1200px - 64px) / 2)`,
              transition: {
                duration: 0.25,
                ease: "easeInOut",
              },
            }}
            style={{
              transform: isAtTop
                ? "translateX(0)"
                : "translateX(calc(-1*(100vw - 1200px - 64px) / 2))",
              minHeight: initialHeight ?? "auto",
            }}
          >
            <ul className="mb-0 pl-0 list-none">
              {sections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                  <li
                    key={section.id}
                    className="flex items-start mt-3 font-[14px] leading-[18px]"
                  >
                    <motion.a
                      onClick={() => navigateToSection(section.id)}
                      className="relative flex items-center will-change-transform origin-left my-a cursor-pointer"
                      style={
                        {
                          "--a-bg": isActive ? "var(--primary)" : "",
                          "--before-opacity": isActive ? 1 : 0,
                        } as React.CSSProperties
                      }
                      animate={{
                        height: isAtTop ? "" : hover ? "" : "1px",
                        transition: {
                          duration: 0.25,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <motion.div
                        animate={{
                          width: isActive ? "24px" : "18px",
                          transition: {
                            duration: 0.15,
                          },
                        }}
                        style={
                          {
                            "--line-opacity": isAtTop ? 0 : hover ? 0 : 1,
                          } as React.CSSProperties
                        }
                        className={`my-line ${
                          isActive
                            ? "bg-accent-foreground"
                            : "bg-accent-foreground/30"
                        }`}
                      />
                      <motion.div
                        animate={{
                          opacity: isAtTop ? 1 : hover ? 1 : 0,
                          scale: isAtTop ? 1 : hover ? 1 : 0,
                          transition: {
                            duration: 0.25,
                            ease: "easeInOut",
                          },
                        }}
                        className="origin-left will-change-transform"
                      >
                        <span
                          className={`inline transition-colors text-sm duration-250 hover:text-accent-foreground ${
                            isActive
                              ? "text-accent-foreground"
                              : "text-accent-foreground/45"
                          }`}
                        >
                          {section.title}
                        </span>
                      </motion.div>
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* middle column for content */}
        <div className="flex flex-col gap-10 max-w-[680px] mx-6 lg:mx-0">
          {children}
        </div>

        {/* right column (empty) */}
        <div></div>
      </div>
    </div>
  );
};
