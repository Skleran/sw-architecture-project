import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex h-full w-full fixed flex-col items-center justify-center bg-muted/30 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
}
