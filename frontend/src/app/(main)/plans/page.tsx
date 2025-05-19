"use client";
import { Button } from "@/components/ui/button";
import { Sparkle, UserRound, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Plans() {
  const [billingOption, setBillingOption] = useState<"monthly" | "yearly">(
    "yearly"
  );

  const planData = {
    monthly: {
      price: "$10 USD/month",
      href: "/plans/monthly",
    },
    yearly: {
      price: "$100 USD/year",
      originalPrice: "$120",
      savings: "Save $20",
      href: "/plans/yearly",
    },
  };

  const handleBillingOptionChange = (option: "monthly" | "yearly") => {
    setBillingOption(option);
  };

  return (
    <>
      <div className="container gap-6 mx-6 my-8 sm:mt-24 flex flex-col items-center justify-center">
        <h1 className="text-3xl tracking-tight font-serif text-center pb-4 sm:pb-8 max-w-92">
          Support your favorite writers on ArticleWorm
        </h1>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground sm:hidden">
            Select a billing option
          </p>
          <div className="w-full grid grid-cols-2 gap-0.5">
            <Button
              variant={billingOption === "monthly" ? "default" : "secondary"}
              className="p-7 rounded-l-3xl rounded-r-sm text-base"
              onClick={() => handleBillingOptionChange("monthly")}
            >
              Pay monthly
            </Button>
            <Button
              variant={billingOption === "yearly" ? "default" : "secondary"}
              className="p-7 rounded-r-3xl rounded-l-sm flex flex-col gap-0 leading-4"
              onClick={() => handleBillingOptionChange("yearly")}
            >
              <p className="text-base">Pay annually</p>
              <p className="text-xs text-[11px]">Save up to $20</p>
            </Button>
          </div>
        </div>
        <div className="flex flex-col mx-4 items-center gap-6 py-8 px-6 border-1 w-full rounded-2xl sm:max-w-[360px]">
          <div className="w-fit h-fit p-2 border-2 border-muted-foreground rounded-full relative">
            <UserRound strokeWidth="1.4" className="size-20" />
            <Sparkle
              size="30"
              color="#ffc017"
              fill="#ffc017"
              strokeWidth={2}
              className="absolute top-0 right-0"
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold">Member</p>
            {billingOption === "monthly" ? (
              <p>{planData.monthly.price}</p>
            ) : (
              <div className="flex gap-1">
                <p className="text-muted-foreground line-through">
                  {planData.yearly.originalPrice}
                </p>
                <p>{planData.yearly.price}</p>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Access member-only stories and enjoy an enhanced reading and writing
            experience.
            <br />
            Cancel anytime.
          </p>
          <div className="w-full">
            <Link href={planData[billingOption].href}>
              <Button className="w-full rounded-3xl">Select</Button>
            </Link>
          </div>
          <div className="w-full border-t-1" />
          <div className="w-full">
            <ul className="w-full flex flex-col gap-2 justify-center">
              <li className="flex gap-2">
                <Check className="mt-0.5" />
                <p>Support writers you read most</p>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5" />
                <p>Earn money for your writing</p>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5" />
                <p>Create your own publications</p>
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5" />
                <p>Support devs of ArctileWorm</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
