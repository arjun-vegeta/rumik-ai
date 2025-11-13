import HomeNavbar from "@/components/HomeNavbar";
import NewHomePage from "@/components/NewHomePage";

export default function Page() {
  return (
    <main className="bg-[#FCFAF7] text-black min-h-screen">
      <HomeNavbar />
      <NewHomePage />
    </main>
  );
}
