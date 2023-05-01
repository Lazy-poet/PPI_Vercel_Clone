import { useSystemValues } from "@/contexts/ValueContext";
import Spinner from "./Spinner";

const Loading = () => {
  const {
    userData: { firstName },
  } = useSystemValues();
  return (
    <div className="fixed w-screen h-screen top-0 left-0 z-50 bg-white flex flex-col gap-2 items-center justify-center p-5 dark:bg-gray-700">
      <Spinner
        className="my-2"
        large
        helper={`Checking your Information, ${firstName}`}
      />
    </div>
  );
};

export default Loading;
