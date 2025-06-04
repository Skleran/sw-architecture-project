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

  return <>{children}</>;
}
