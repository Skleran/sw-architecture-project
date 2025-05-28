import NewStoryNavbar from "@/components/new-story-navbar";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <>
      <div className="pb-16">
        {" "}
        <NewStoryNavbar />
        <Input
          type="text"
          placeholder="Title"
          className="max-w-[796px] mt-6 mb-4 mx-0 px-6 xs:px-12 bg-transparent dark:bg-transparent focus-visible:ring-0 place-self-center h-auto text-3xl md:text-4xl font-serif"
        />
        <SimpleEditor />
      </div>
    </>
  );
}
