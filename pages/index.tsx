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
import { useRouter } from "next/router";
import Hotjar from "@/components/Hotjar";

const Claim = dynamic(() => import("@/components/Claim"), {
  loading: () => (
    <div className="w-screen h-screen bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-white ">
      <Spinner />
    </div>
  ),
});

type HomeProps = {
  link_code: string;
  data: UserData[];
};

export default function Home(props: HomeProps) {
  const [ready, setReady] = useState(false);
  const {
    setAmount,
    setClaimValue,
    setLinkCode,
    setDbData,
    setUserIp,
    setUserEmail,
    setUserPhone,
  } = useSystemValues();

  const router = useRouter();
  useEffect(() => {
    if (router.query.c && !props.link_code) {
      router.push("/");
    }
    setLinkCode(props.link_code);
    if (props.data?.[0]) {
      setDbData((_) => ({ ...props.data[0] }));
      setAmount(props.data[0]?.estimated_total);
      setUserEmail(props.data[0].email);
      setUserPhone(props.data[0].phone);
    }
    (async () => {
      const { userIp } = await (await fetch("/api/ip")).json();
      setUserIp(userIp);
      if (props.link_code) {
        await supabase
          .from("PPI_Claim_Form")
          .update({
            user_ip: userIp,
          })
          .match({ link_code: props.link_code });
      }
    })();
  }, []);

  return (
    <div className="relative">
      <Banner />
      <Hotjar />
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
  const { c: link_code } = context.query;

  let data = [] as any;

  if (link_code) {
    const { data: result, error } = await supabase
      .from("PPI_Claim_Form")
      .select()
      .match({ link_code })
      .select();
    data = result;
  }

  return {
    props: {
      link_code: link_code && data?.length ? link_code : null,
      data,
    },
  };
}

// Workaround for issues with function size limit
export const config = {
  unstable_excludeFiles: ["public/**/*", "node_modules/canvas/**/*"],
};
