import { useEffect, useState, lazy, Suspense } from "react";
import { UserData } from "@/libs/constants";
import supabase from "utils/client";
import { useSystemValues } from "@/contexts/ValueContext";
import HeroSection from "@/components/HeroSection";
// import ReviewSection from "@/components/ReviewSection";
import Testimonials from "@/components/Testimonials";
// import Banner from "@/components/Banner";
import { GetServerSidePropsContext } from "next";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import LoadScripts from "@/components/Scripts";
import PdfViewer from "@/components/PdfViewer";
import { Worker } from "@react-pdf-viewer/core";
import Features from "@/components/Features";
import Layout from "@/components/Layout";

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
  const {
    setAmount,
    setClaimValue,
    setLinkCode,
    setDbData,
    setUserIp,
    setUserEmail,
    setUserPhone,
    ready,
    setReady,
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
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js">
      <Layout>
        <div className="relative">
          {/* <Banner />  */}
          <LoadScripts />
          <PdfViewer />
          {ready ? (
            <Claim setReady={setReady} data={props.data} />
          ) : (
            <>
              <HeroSection
                handleStart={() => {
                  setReady(true);
                }}
              />
              <Features />
              {/* <ReviewSection /> */}
              <Testimonials />
            </>
          )}
        </div>
      </Layout>
    </Worker>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  let { c: link_code } = context.query;

  let data = [] as any;

  if (link_code) {
    const { data: result, error } = await supabase
      .from("PPI_Claim_Form")
      .select()
      .match({ link_code })
      .select();
    if (result?.[0] && result[0].insurance) {
      link_code = undefined;
    } else {
      data = result;
    }
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
