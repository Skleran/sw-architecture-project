import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-full w-full fixed flex-col items-center justify-center bg-muted/30 p-6 md:p-10">
      <Link href="/">
        <Button className="absolute top-3 left-3 md:hidden rounded-full hover:bg-neutral-400/40 text-[#171717] bg-neutral-200/35 h-8 items-center transition-colors">
          Back to Home
        </Button>
      </Link>
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
