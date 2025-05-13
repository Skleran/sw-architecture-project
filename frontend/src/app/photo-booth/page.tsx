import Link from "next/link";
import places from "./places";
import Image from "next/image";

export default function PhotoBooth() {
  return (
    <main className="container mx-auto">
      <h1 className="text-center text-3xl font-bold my-4">
        Wonders of the Istanbul
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {places.map(({ id, src, name }) => (
          <Link key={id} href={`/photo-booth/${id}`}>
            <Image
              alt={name}
              src={src}
              className="w-full object-cover aspect-square"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
