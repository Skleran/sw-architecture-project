import Sidebar from "@/components/sidebar";
import TagSelector from "@/components/tag-selector";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tags = [
    { id: "1", name: "Programming", slug: "programming" },
    { id: "2", name: "Machine Learning", slug: "machine-learning" },
    { id: "3", name: "Data Science", slug: "data-science" },
    { id: "4", name: "Web Development", slug: "web-development" },
    { id: "5", name: "Humor", slug: "humor" },
    { id: "6", name: "UX", slug: "ux" },
    { id: "7", name: "React", slug: "react" },
  ];
  return (
    <>
      <div className="w-full lg:w-[1200px] grid grid-cols-[1fr] lg:grid-cols-[2fr_1fr] ">
        <div className="flex flex-col relative">
          <div className="w-full flex justify-center absolute">
            <TagSelector tags={tags} />
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
