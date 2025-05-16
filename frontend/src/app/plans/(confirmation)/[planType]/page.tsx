import Payment from "@/components/payment";
import { redirect } from "next/navigation";

type PlanType = "monthly" | "yearly";

export default async function PlanPage({
  params,
}: {
  params: Promise<{ planType: string }>;
}) {
  const validPlans = {
    monthly: { name: "monthly", price: 10 },
    yearly: { name: "annual", price: 100 },
  };

  const planType = (await params).planType.toLowerCase() as PlanType;

  if (!(planType in validPlans)) {
    redirect("/plans");
  }

  const plan = validPlans[planType];

  return <Payment planType={plan.name} price={plan.price} />;
}
