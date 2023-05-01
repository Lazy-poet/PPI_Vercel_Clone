import Image from "next/image";
import SslImg from "../public/images/ssl-secure.svg";
import InputHelper from "./InputHelper";

type Props = {};

const SslSecure = (props: Props) => {
  return (
    <>
      <InputHelper
        text="This form is encrypted to ensure your data is safe"
        align="center"
      />
      <Image
        className="w-28 md:w-32 mt-5 mx-auto sm:mx-0"
        src={SslImg}
        alt="Secure"
      />
    </>
  );
};

export default SslSecure;
