import ProfileHeader from "@/components/profile-header";
import ProfileSidebar from "@/components/profile-sidebar";
import ProfileTagSelector from "@/components/profile-tag-selector";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tags = [
    { id: "1", name: "Home", slug: "" },
    { id: "2", name: "About", slug: "about" },
  ];

  const userData = {
    name: "John Doe",
    imgSrc: "https://randomuser.me/api/portraits/lego/2.jpg",
    followers: 9300,
  };

  return (
    <>
      <div className="w-full lg:w-[1200px] grid grid-cols-[1fr] lg:grid-cols-[2fr_1fr] ">
        <div className="flex flex-col mx-auto relative w-full items-center">
          <div className="w-full flex flex-col gap-1 max-w-[726px] justify-center absolute mt-6 lg:mt-10">
            <ProfileHeader UserData={userData} />
            <ProfileTagSelector tags={tags} />
          </div>
          <div className="mt-[210px] lg:mt-[176px] mx-6 lg:mx-0">
            {children}
          </div>
        </div>
        <div className="flex-col gap-4 hidden lg:flex mt-6">
          <ProfileSidebar UserData={userData} />
        </div>
      </div>
    </>
  );
}
