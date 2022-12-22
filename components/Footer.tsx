import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link
          href="/"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            src="/images/favicon.png"
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
          <span>ClaimingMadeEasy™</span>
        </Link>
        <p className="my-6 max-w-2xl mx-auto  text-gray-500 dark:text-gray-400">
          ClaimingMadeEasy is a trading style of Approved Claims Group Ltd |
          Company Number: 12552579 | Address: 20-22 Wenlock Road, London N1 7GU
        </p>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2021-2022&nbsp;
          <Link href="/" className="hover:underline">
            ClaimingMadeEasy™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
