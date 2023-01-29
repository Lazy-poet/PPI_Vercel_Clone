import { useEffect, useState, lazy, Suspense } from "react";
import { UserData } from "@/libs/constants";
import HomeLayout from "@/components/HomeLayout";
import supabase from "utils/client";
import { useSystemValues } from "@/contexts/ValueContext";
import HeroSection from "@/components/HeroSection";
import ReviewSection from "@/components/ReviewSection";
import Banner from "@/components/Banner";
import { GetServerSidePropsContext } from "next";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";

const Claim = dynamic(() => import("@/components/Claim"), {
  loading: () => (
    <div className="w-screen h-screen bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-white ">
      <Spinner />
    </div>
  ),
});

type HomeProps = {
  urlEmail: string;
  urlPhone: string;
  data: UserData[];
};

export default function Home(props: HomeProps) {
  const [ready, setReady] = useState(false);
  const {
    setAmount,
    setClaimValue,
    setUrlEmail,
    setUrlPhone,
    setDbData,
    setUserIp,
  } = useSystemValues();

  useEffect(() => {
    setUrlEmail(props.urlEmail);
    setUrlPhone(props.urlPhone);
    if (props.data?.[0]) {
      setDbData((_) => ({ ...props.data[0] }));
      setAmount(props.data[0]?.estimated_total);
      setClaimValue(props.data[0].claimValue);
    }
    (async () => {
      const { userIp } = await (await fetch("/api/ip")).json();
      setUserIp(userIp);
    })();
  }, []);

  return (
    <div className="relative">
      <Banner />
      {ready ? (
        <Claim setReady={setReady} data={props.data} />
      ) : (
        <HomeLayout>
          <HeroSection
            handleStart={() => {
              setReady(true);
            }}
          />
          <ReviewSection />
        </HomeLayout>
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const { e: urlEmail, p: urlPhone } = context.query;
  let data = [] as any;
  if (urlEmail || urlPhone) {
    const { data: result, error } = await supabase
      .from("PPI_Claim_Form")
      .select()
      .match(urlPhone ? { phone: urlPhone } : { email: urlEmail })
      .select();
    data = result;
  }

  return {
    props: {
      urlEmail: urlEmail || null,
      urlPhone: urlPhone || null,
      data,
    },
  };
}

// Workaround for issues with function size limit
export const config = {
  unstable_excludeFiles: ["public/**/*", "node_modules/canvas/**/*"],
};
