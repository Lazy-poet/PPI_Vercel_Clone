type Props = {
  onClick: any;
  label?: string;
  helper?: string;
};

const NextButton = ({ onClick, label = "Next", helper = "" }: Props) => {
  return (
    <div className="w-full text-gray-500 mt-10 mb-8 md:mb-24">
      <ul className="grid gap-6 w-full md:grid-cols-2">
        <li className="md:col-span-2">
          <div>
            <button
              className="inline-flex justify-between items-center p-5 w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => onClick()}
            >
              <div className="flex-grow">
                <div className="w-full flex flex-row justify-center items-center text-2xl font-semibold">
                  <span>{label}</span>
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
            <img
              className="w-20 mt-4"
              src="/images/ssl-secure.png"
              alt="Secure"
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
