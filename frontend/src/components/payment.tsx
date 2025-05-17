import Link from "next/link";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type PaymentProps = {
  planType: string;
  price: number;
};

export default function Payment({ planType, price }: PaymentProps) {
  return (
    <>
      <div className="w-full px-6 py-8 gap-4 border-1 rounded-2xl flex flex-col">
        <div className="flex flex-col items-start justify-between w-full sm:flex-row">
          <div className="text-xl font-semibold">
            <p>ArticleWorm Member ({planType})</p>
          </div>
          <Link href="/plans">
            <Button
              variant="link"
              className="p-0 underline underline-offset-2 sm:no-underline sm:hover:underline"
            >
              Change plan
            </Button>
          </Link>
        </div>
        <div className="w-full border-t-1 border-accent" />
        <div className="w-full flex text-muted-foreground flex-col sm:flex-row justify-between">
          <p>Billed Today</p>
          <p className="text-primary font-semibold text-lg">${price}</p>
        </div>
      </div>

      <form className="w-full px-6 py-6 gap-4 border-1 rounded-2xl flex flex-col">
        <p className="text-lg font-semibold">Credit/Debit Card</p>
        <div className="w-full border-t-1 border-accent" />
        <div className="w-full flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-2 sm:flex-1/2">
            <Label>Card number</Label>
            <Input
              type="number"
              id="card-number"
              placeholder="5555 5555 4444 4444"
              className="font-mono"
            />
          </div>
          <div className="flex gap-6 sm:flex-1/2">
            <div className="flex flex-col w-full gap-2">
              <Label>Expiration</Label>
              <Input
                id="expiration"
                placeholder="MM/YY"
                className="font-mono"
              />
            </div>
            <div className="flex flex-col gap-2 w-fit">
              <Label>Security Code</Label>
              <Input
                type="number"
                id="security-code"
                placeholder="123"
                className="font-mono"
              />
            </div>
          </div>
        </div>
        <Button className="rounded-full mt-2 sm:w-1/2 sm:self-center">
          Pay
        </Button>
      </form>
    </>
  );
}
