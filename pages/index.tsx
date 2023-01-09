import HeroSection from "@/components/HeroSection";
import ReviewSection from "@/components/ReviewSection";
import Layout from "@/components/HomeLayout";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ReviewSection />
    </Layout>
  );
}
