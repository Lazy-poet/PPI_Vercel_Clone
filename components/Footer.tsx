import { useSystemValues } from "@/contexts/ValueContext";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { openPdf } = useSystemValues();
  return (
    <footer className="px-4 py-16 bg-white dark:bg-gray-800">
      <div className="mx-autos max-w-screen-xl text-center">
        <Link
          href="/"
          className="flex justify-start sm:justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src="/images/favicon.png"
            className="mr-3 h-8 sm:h-9"
            style={{ objectFit: "contain" }}
            alt="Logo"
            width={36}
            height={36}
          />
          <span>QuickTaxClaims</span>
        </Link>
        <div className="flex flex-col justify-start items-center gap-8 mt-6 text-left sm:text-center ">
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
            Quick Tax Claims Limited | Company Number: 14377745 | Address: 61
            Mosley Street, Manchester, M2 3HZ. We provide our service on a
            no-win-no-fee basis. If your claim is successful, we will charge a
            fee of 48% (inclusive of VAT where applicable) of all rebates
            received from HMRC.{" "}
            <span className="block">
              <a
                href="#"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  openPdf("terms-of-service.pdf");
                }}
              >
                Terms & Conditions{" "}
              </a>
              |{" "}
              <a
                href="#"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  openPdf("privacy-policy.pdf");
                }}
              >
                Privacy Policy
              </a>
            </span>
          </p>
          <span className="w-full text-gray-500 sm:text-center dark:text-gray-400">
            © 2023&nbsp;
            <Link href="/" className="hover:underline">
              QuickTaxClaims
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
