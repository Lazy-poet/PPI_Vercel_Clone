import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import ReviewSection from "@/components/ReviewSection";
import HeroSection from "@/components/HeroSection";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ReviewSection />
      <Footer />
    </main>
  );
}
