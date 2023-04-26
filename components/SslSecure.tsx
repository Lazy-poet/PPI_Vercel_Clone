import Image from "next/image";
import SslImg from "../public/images/ssl-secure.svg";

type Props = {};

const SslSecure = (props: Props) => {
  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-5 text-left mx-auto w-fit sm:w-full sm:mx-0">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          className="float-left mr-1 mb-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 9V7C5 5.67392 5.52678 4.40215 6.46447 3.46447C7.40215 2.52678 8.67392 2 10 2C11.3261 2 12.5979 2.52678 13.5355 3.46447C14.4732 4.40215 15 5.67392 15 7V9C15.5304 9 16.0391 9.21071 16.4142 9.58579C16.7893 9.96086 17 10.4696 17 11V16C17 16.5304 16.7893 17.0391 16.4142 17.4142C16.0391 17.7893 15.5304 18 15 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V11C3 10.4696 3.21071 9.96086 3.58579 9.58579C3.96086 9.21071 4.46957 9 5 9ZM13 7V9H7V7C7 6.20435 7.31607 5.44129 7.87868 4.87868C8.44129 4.31607 9.20435 4 10 4C10.7956 4 11.5587 4.31607 12.1213 4.87868C12.6839 5.44129 13 6.20435 13 7Z"
            fill="#111928"
          />
        </svg>

        <span>This form is securely encrypted to ensure your data is safe</span>
      </p>
      <Image
        className="w-28 md:w-32 mt-4 mx-auto sm:mx-0"
        src={SslImg}
        alt="Secure"
      />
    </>
  );
};

export default SslSecure;