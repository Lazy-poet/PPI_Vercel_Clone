import { useRouter } from "next/router";
import { STEP } from "@/libs/constants";
import Title from "@/components/Title";
import NextButton from "@/components/NextButton";
import ReviewSection from "@/components/ReviewSection";
import ErrorContent from "@/components/steps/Step-Error";
import Layout from "@/components/Layout";

export default function Error() {
  const router = useRouter();

  const restart = () => {
    router.push("/");
  };

  return (
    <Layout>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto lg:flex gap-2">
          <div className="flex items-start mx-auto md:w-[42rem] px-4 md:px-8 xl:px-0">
            <div className="w-full">
              <Title step={STEP.ERROR} />

              <ErrorContent />

              <NextButton onClick={restart} label="Restart application" />
            </div>
          </div>
        </div>
      </section>

      <ReviewSection />
    </Layout>
  );
}
