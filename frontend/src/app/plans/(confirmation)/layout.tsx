export default function PaymentLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <div className="container max-w-180 px-6 flex flex-col gap-8 items-center justify-center">
        <p className="font-serif text-3xl tracking-tight py-8">Payment</p>
        {props.children}
      </div>
    </>
  );
}
