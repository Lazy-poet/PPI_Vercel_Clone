import Link from "next/link";
import Head from "next/head";
import { THEME, useThemeContext } from "@/contexts/ThemeContext";
import Flag from "../public/images/union-flag.svg";
import Favicon from "../public/images/favicon.png";
import Image from "next/image";
import HeaderReviewLight from "../public/images/trustpilot-light.svg";
import HeaderReviewDark from "../public/images/trustpilot-dark.svg";

const Header = () => {
  const { theme, changeTheme } = useThemeContext();

  const toggleTheme = () => {
    if (theme === THEME.LIGHT) {
      changeTheme(THEME.DARK);
    } else if (theme === THEME.DARK) {
      changeTheme(THEME.LIGHT);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800">
      <Head>
        {/* Review Script */}
        <script
          defer
          async
          src="https://cdn.trustindex.io/loader.js?13af5d813e3e503aa57601c3555"
        ></script>
      </Head>
      <nav className="max-w-screen-xl mx-auto px-4 md:px-20 py-6 border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl flex gap-2">
          <Link
            href="/"
            className=" flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white gap-1 sm:gap-2"
          >
            <Image
              src={Favicon}
              className="w-9"
              style={{ objectFit: "contain" }}
              alt="Logo"
            />
            <span className="text-lg sm:text-xl lg:text-2xl">
              QuickTaxClaims™
            </span>
          </Link>
          <div className="flex justify-center items-center gap-2">
            <Image
              className="flex-1 w-10 md:w-12 max-h-full"
              src={Flag}
              alt="uk logo"
            />
            <Image
              className="flex-1 w-[72px] md:w-20"
              src={theme === THEME.DARK ? HeaderReviewLight : HeaderReviewDark}
              alt="uk logo"
            />
          </div>

          {/* DISABLE THEME SWITCHER */}
          {/* <div className="flex items-center md:order-2">
            <button
              type="button"
              className="text-gray-400 font-medium rounded-lg text-sm py-2 outline-none ring-0 focus:right-0 focus:outline-none"
              onClick={() => toggleTheme()}
              aria-label="Toggle between Dark Mode and Light mode"
            >
              {theme === THEME.LIGHT && (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
              {theme === THEME.DARK && (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
