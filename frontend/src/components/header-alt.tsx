import ChangeThemeTabs from "./ui/theme-selector";

export default function Header() {
  return (
    <>
      <div className="border-b-1 flex justify-center items-center sticky top-0 z-50 bg-background">
        <p className="text-3xl leading-8 my-3 font-serif cursor-pointer tracking-tight select-none">
          ArticleWorm
        </p>
        <ChangeThemeTabs animationKey="change-theme" />
      </div>
    </>
  );
}
