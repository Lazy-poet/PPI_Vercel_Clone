import Image from "next/image";

type Props = {
  onClick: VoidFunction;
  timer?: string;
  label?: string;
  helper?: string | any;
};

const NextButton = ({
  onClick,
  timer = "",
  label = "Next",
  helper = "",
}: Props) => {
  return (
    <div className="w-full text-gray-500 mt-10 mb-8 md:mb-24">
      <ul className="grid gap-6 w-full md:grid-cols-2">
        <li className="md:col-span-2">
          <div>
            <button
              id="btnNext"
              className="inline-flex justify-between items-center p-5 w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={onClick}
            >
              <div className="flex-grow">
                <div className="w-full flex flex-col justify-center items-center text-2xl font-semibold">
                  <span>{label}</span>
                  {timer && (
                    <div className="flex justify-center items-center space-x-2 text-sm font-medium">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.11409 6H8V8H2V1.99121H4V4.25645C6.23708 1.91056 8.78663 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12H3C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C9.15922 3 7.04466 3.79137 5.11409 6ZM13 11H17V13H11V6H13V11Z"
                        />
                      </svg>
                      <span>{timer}</span>
                    </div>
                  )}
                </div>
              </div>
              <svg
                aria-hidden="true"
                className="ml-3 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {helper && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {helper}
              </p>
            )}
            <Image
              className="mt-4"
              src="/images/ssl-secure.svg"
              alt="Secure"
              width={80}
              height={20}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your information is 100% safe and secure on this website
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NextButton;
