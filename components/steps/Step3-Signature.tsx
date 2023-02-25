import { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { CONFIRMS } from "@/libs/doms";
import { THEME } from "@/contexts/ThemeContext";
import { useThemeContext } from "@/contexts/ThemeContext";

const Signature = (props: any) => {
  const { data, handleFormChange } = props;
  const canvasRef = useRef<SignatureCanvas>(null);
  const { theme } = useThemeContext();

  const clear = () => {
    if (!data.signatureData) return;
    // @ts-ignore
    canvasRef.current.clear();
    handleFormChange(null);
  };

  const trim = async () => {
    let data_url = canvasRef.current!.toDataURL("image/png");
    if (theme === THEME.DARK) {
      data_url = await convertToGrayScaleOrBlack(data_url, "black");
    }
    handleFormChange(
      // @ts-ignore
      data_url
    );
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
    const signatureData = data.signatureData;
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
      <ul className="space-y-1 list-inside text-gray-500 dark:text-gray-400">
        {CONFIRMS.map((confirm, index) => {
          return (
            <li key={index} className="flex justify-start items-start">
              <svg
                className="w-5 h-5 mt-[3px] mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {confirm}
            </li>
          );
        })}
      </ul>

      <div
        className={`form-group mt-6 ${
          data.firstEvent ? "" : data.signatureData ? "success" : "error"
        }`}
      >
        <label
          htmlFor="first-name"
          className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
        >
          Draw your signature
        </label>

        <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="bg-[#F9FAFB] rounded-t-lg dark:bg-gray-800 relative">
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 h-[1px] rounded-lg bg-gray-700 dark:bg-gray-400 pointer-events-none" />
            <SignatureCanvas
              ref={canvasRef}
              canvasProps={{
                className: "w-full h-[200px]",
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
        <p
          className={`mt-2 text-sm ${
            data.firstEvent || data.signatureData
              ? "text-gray-500 dark:text-gray-400 "
              : "error"
          }`}
        >
          Please sign in the boundaries of the box above
        </p>
      </div>
    </div>
  );
};

export default Signature;
