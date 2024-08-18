import Image from "next/image";
import { Product } from "@/components/component/product";
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center py-24 px-4">
      <div className="flex flex-col xl:grid xl:grid-cols-3 gap-2 z-10 w-full max-w-5xl items-center justify-center font-mono text-sm justify-items-center align-items-center">
        <Product />
      </div>
    </main>
  );
}
