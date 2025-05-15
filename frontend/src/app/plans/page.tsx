"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Plans() {
  const router = useRouter();

  const handleClick = () => {
    console.log("You are now a member!");
    router.push("/");
  };
  return (
    <>
      <div className="container gap-6 mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl tracking-tighter font-semibold">
          Become a member
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-1 rounded-xl w-48 flex flex-col items-center justify-center gap-4 p-2">
            <p className="text-xl font-semibold">Monthly Plan</p>
            <Link href="/plans/confirmation/monthly">
              <Button>Select</Button>
            </Link>
          </div>
          <div className="border-1 rounded-xl w-48 flex flex-col items-center justify-center gap-4 p-2">
            <p className="text-xl font-semibold">Yearly Plan</p>
            <Link href="/plans/confirmation/yearly">
              <Button>Select</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
