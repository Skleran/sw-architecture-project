import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentLayout() {
  return (
    <>
      <div className="container max-w-180 px-6 flex flex-col items-center justify-center">
        <p className="font-serif text-2xl tracking-tight pb-20">Payment</p>
        <div className="w-full px-6 py-8 gap-4 border-1 rounded-2xl flex flex-col">
          <div className="flex flex-col items-start w-full sm:flex-row">
            <div className="text-xl font-semibold flex w-full justify-between sm:justify-start sm:gap-2">
              <p>ArticleWorm Member</p>
              <p>()</p>
            </div>
            <Link href="/plans">
              {" "}
              <Button
                variant="link"
                className="p-0 underline underline-offset-2"
              >
                Change plan
              </Button>
            </Link>
          </div>
          <div className="w-full border-t-1 border-accent" />
          <div className="w-full flex text-muted-foreground flex-col sm:flex-row justify-between">
            <p>Billed Today</p>
            <p className="text-primary font-semibold text-lg">$50</p>
          </div>
        </div>
      </div>
    </>
  );
}
