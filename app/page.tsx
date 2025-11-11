import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import ToastHandler from "@/components/ToastHandler";
import HomePage from "@/components/HomePage";

export default function Page() {
  return (
    <main className="bg-[#FCFAF7] text-black min-h-screen">
      <Navbar />
      <Suspense fallback={null}>
        <ToastHandler />
      </Suspense>
      <HomePage />
    </main>
  );
}
