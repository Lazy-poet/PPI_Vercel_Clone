import { useSystemValues } from "@/contexts/ValueContext";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const {openPdf} = useSystemValues()
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link
          href="/"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
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
        <p className="my-6 max-w-2xl mx-auto  text-gray-500 dark:text-gray-400">
          Quick Tax Claims Limited | Company Number: 14377745 | Address: 61
          Mosley Street, Manchester, M2 3HZ | info@quicktaxclaims.co.uk
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <a
              href="#"
              className="mr-4 hover:underline md:mr-6 "
              onClick={(e) => {
                e.preventDefault();
                openPdf("privacy-policy.pdf");
              }}
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 hover:underline md:mr-6"
              onClick={(e) => {
                e.preventDefault();
                openPdf("terms-of-service.pdf");
              }}
            >
              Terms
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023&nbsp;
          <Link href="/" className="hover:underline">
            QuickTaxClaims
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
