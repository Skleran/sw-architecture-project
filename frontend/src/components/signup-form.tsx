"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import FloatingLabelInput from "./ui/floating-input";
// import TransitionLink from "./ui/transition-link";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  // Mock signup function to replace the actual signup logic
  const mockSignup = () => {
    // This is a placeholder for your actual signup logic
    console.log("Mock signup function called");
    toast.success("Signup successful", {
      description: "You can now login",
    });

    // Navigate to login page with transitions if supported
    if (!document.startViewTransition) {
      router.push("/login");
      return;
    }

    document.startViewTransition(() => {
      router.push("/login");
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Basic form validation
      if (!name || name.length < 2) {
        setError("Please enter a valid name");
        return;
      }

      if (!email || !email.includes("@")) {
        setError("Please enter a valid email address");
        return;
      }

      if (!password || password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      // Mock successful signup
      mockSignup();

      /* Commented out actual signup implementation
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (
          data.code === "P2002" ||
          (data.message && data.message.includes("Unique constraint failed"))
        ) {
          setError(
            "Email address is already in use. Please use a different email."
          );
        } else {
          setError(data.message || "Signup failed");
        }
        return;
      }

      toast.success("Signup successful", {
        description: "You can now login",
      });

      if (!document.startViewTransition) {
        navigate("/login");
        return;
      }

      document.startViewTransition(() => {
        navigate("/login");
      });
      */
    } catch (err) {
      console.log(err);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden max-md:bg-neutral-50/95 max-md:dark:bg-neutral-950/90">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="absolute flex overflow-hidden md:hidden w-screen h-screen bg-accent left-0 top-0 -z-1">
            <div className="flex">
              <img
                className="h-screen bg-cover w-screen object-cover brightness-100 dark:brightness-70"
                src="https://4kwallpapers.com/images/wallpapers/black-and-white-2560x1080-21293.jpg"
                alt=""
              />
            </div>
          </div>
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Create your ArticleWorm account
                </p>
              </div>
              <div className="">
                <FloatingLabelInput
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <FloatingLabelInput
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="pb-4">
                <FloatingLabelInput
                  id="password"
                  label="Password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                type="submit"
                className={`w-full hover:cursor-pointer ${
                  initialRender ? "" : "transition-colors duration-200"
                } `}
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className="w-full items-center justify-center flex flex-row"
                  >
                    <Loader2 className="animate-spin mr-2" />
                    <p>Please Wait</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="still"
                    initial={
                      initialRender
                        ? { y: 0, opacity: 1 }
                        : { y: -20, opacity: 0 }
                    }
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className="text-center"
                  >
                    <p className="">Sign Up</p>
                  </motion.div>
                )}
              </Button>
              <div className="text-center text-sm">
                Have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="h-full p-2 pl-0 hidden md:block relative">
            <div className="h-full w-full rounded-sm overflow-hidden flex relative">
              <img
                className="h-full bg-cover w-full object-cover brightness-125 dark:brightness-100"
                src="https://4kwallpapers.com/images/wallpapers/black-and-white-2560x1080-21293.jpg"
                alt=""
              />
              <div className="absolute w-full h-full text-center flex flex-col items-center justify-between">
                <div className="mt-2 px-3 flex flex-row w-full justify-between">
                  <div className="font-serif text-2xl dark:mix-blend-exclusion">
                    ArticleWorm
                  </div>
                  <Link href="/">
                    <Button className="rounded-full hover:bg-neutral-400/40 text-[#171717] bg-neutral-200/35 h-8 items-center transition-colors">
                      Back to Home
                    </Button>
                  </Link>
                </div>
                <div className="mb-4 text-[#e8e8e8] dark:mix-blend-exclusion leading-6.5 text-xl font-serif">
                  A place to read, write <br /> and deepen your understanding
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
