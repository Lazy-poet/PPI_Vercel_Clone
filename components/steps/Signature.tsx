import { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { CONFIRMS } from "@/libs/doms";
import { THEME } from "@/contexts/ThemeContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useSystemValues } from "@/contexts/ValueContext";

const Signature = () => {
  const canvasRef = useRef<SignatureCanvas>(null);
  const { theme } = useThemeContext();
  const {
    userData,
    firstEvents,
    handleFormChange,
    openPdf,
    signatureTermsChecked,
    setSignatureTermsChecked,
  } = useSystemValues();

  const clear = () => {
    if (!userData.signatureData) return;
    // @ts-ignore
    canvasRef.current.clear();
    handleFormChange("signatureData", "");
  };

  const trim = async () => {
    let data_url = canvasRef.current!.toDataURL("image/png");
    if (theme === THEME.DARK) {
      data_url = await convertToGrayScaleOrBlack(data_url, "black");
    }
    handleFormChange("signatureData", data_url);
  };
  const convertToGrayScaleOrBlack = async (
    dataUrl: string,
    convertTo: "gray" | "black"
  ): Promise<string> => {
    const img = new Image();
    img.src = dataUrl;
    return new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx!.filter =
          convertTo === "gray"
            ? "grayscale(100%) contrast(0%) brightness(100%)"
            : "grayscale(100%) invert(100%) brightness(0%)";
        ctx!.drawImage(img, 0, 0);
        const url = canvas.toDataURL("image/png");
        resolve(url);
      };
    });
  };
  useEffect(() => {
    const signatureData = userData.signatureData;
    if (signatureData && Object.keys(signatureData).length !== 0) {
      (async () => {
        const dataUrl =
          theme === THEME.DARK
            ? await convertToGrayScaleOrBlack(signatureData, "gray")
            : signatureData;
        // @ts-ignore
        canvasRef.current.fromDataURL(dataUrl);
      })();
    }
  }, []);

  return (
    <div className="mt-6">
      <div
        className={`form-group mt-6 ${
          firstEvents.signatureData
            ? ""
            : userData.signatureData
            ? "success"
            : "error"
        }`}
      >
        <label
          htmlFor="first-name"
          className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
        >
          Please draw your signature below
        </label>

        <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="bg-[#F9FAFB] rounded-t-lg dark:bg-gray-800 relative">
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-[1px] rounded-lg bg-gray-700 dark:bg-gray-400 pointer-events-none" />
            <SignatureCanvas
              ref={canvasRef}
              canvasProps={{
                className: "w-full h-[200px] md:h-[220px]",
              }}
              clearOnResize={false}
              penColor={theme === THEME.DARK ? "gray" : "black"}
              onEnd={() => trim()}
            />
          </div>

          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              onClick={() => clear()}
              className="inline-flex items-center gap-2 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 darkring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 darktext-white darkbg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-backspace"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z"></path>
                <path d="M12 10l4 4m0 -4l-4 4"></path>
              </svg>
              CLEAR
            </button>
          </div>
        </div>
        {firstEvents.signatureData || userData.signatureData ? (
          <p className={`mt-2 text-sm ${"text-gray-500 dark:text-gray-400 "}`}>
            Take your time to make your signature accurate. You can start again
            as many times as you like by pressing &quot;Clear&quot;
          </p>
        ) : (
          <p className={`mt-2 text-sm error`}>
            Please sign in the box provided
          </p>
        )}
      </div>
      <div className="p-5 my-10 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800 flex flex-col gap-2 text-lg">
        <p className="font-bold leading-relaxed text-gray-900 dark:text-white">
          What are you signing;
        </p>
        <ul className="space-y-5 list-disc list-inside mt-1 text-gray-900 dark:text-white">
          <li>
            <span className="inline font-medium">
              <span
                className="hover:underline cursor-pointer"
                onClick={() => openPdf("authorise_agent_64-8.pdf")}
              >
                64-8
              </span>{" "}
              Authorising Agent Form:{" "}
            </span>
            <br />
            <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">
              Appoints us as your Tax Agent and allows HMRC to discuss and
              disclose information with us relating to your tax claim and
              records
            </p>
          </li>
          <li>
            <span className="inline font-medium">
              <span
                className="hover:underline cursor-pointer"
                onClick={() => openPdf("R40M2022.pdf")}
              >
                R40
              </span>{" "}
              Claim for repayment of tax deducted from PPI:{" "}
            </span>
            <br />
            <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">
              This is the claim form we will be submitting on your behalf and
              includes our appointment as your nominee
            </p>
          </li>
        </ul>
      </div>
      <div className="flex items-start mt-5">
        <input
          id="link-checkbox"
          type="checkbox"
          checked={signatureTermsChecked}
          onChange={(e) => setSignatureTermsChecked(e.target.checked)}
          className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-checkbox"
          className="ml-2 text-sm text-gray-500 dark:text-gray-400"
        >
          By clicking next, you are confirming that you have read and agree with
          the&nbsp;
          <a
            href="#"
            className="text-blue-600 dark:text-blue-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              openPdf("terms-of-service.pdf");
            }}
          >
            terms & conditions
          </a>
          &nbsp;and that the information you have given on this form is correct,
          to the best of your knowledge
        </label>
      </div>

      {!firstEvents.signatureTermsChecked && !signatureTermsChecked && (
        <p className="mt-2 text-sm error">You must confirm to proceed</p>
      )}
    </div>
  );
};

export default Signature;
