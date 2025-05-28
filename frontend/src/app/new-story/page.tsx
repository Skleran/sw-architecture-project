import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="mb-4 mx-6 pt-2">
        <div className="w-full pt-1 max-w-[1032px] mx-auto flex justify-between">
          <div className="flex gap-3 items-center">
            <Link href={"/"} className="text-2xl font-serif tracking-tight h-7">
              ArticleWorm
            </Link>
            <div className="text-xs pt-1.5">Draft in User Name</div>
          </div>
          <div className="flex items-center gap-6">
            <Button variant={"outline"} className="rounded-full">
              Publish
            </Button>
            <Avatar className="size-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>EK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <SimpleEditor />
    </>
  );
}
