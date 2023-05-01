import Image from "next/image";
import SslImg from "../public/images/ssl-secure.svg";

type Props = {};

const SslSecure = (props: Props) => {
  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center sm:text-left mx-auto w-fit sm:w-full sm:mx-0">
        <span>This form is securely encrypted to ensure your data is safe</span>
      </p>
      <Image
        className="w-28 md:w-32 mt-5 mx-auto sm:mx-0"
        src={SslImg}
        alt="Secure"
      />
    </>
  );
};

export default SslSecure;
