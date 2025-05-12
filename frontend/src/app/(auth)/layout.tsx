export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="h-20 m-2 rounded-xl bg-neutral-800 items-center justify-center flex">
        <p>This is my header</p>
      </header>
      {children}
      <footer className="h-20 m-2 rounded-xl bg-neutral-800 items-center justify-center flex">
        <p>This is my footer</p>
      </footer>
    </>
  );
}
