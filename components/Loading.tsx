import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 z-20 bg-white flex flex-col gap-2 items-center justify-center p-5 dark:bg-gray-700">
      <h1 className="mx-auto text-center text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl dark:text-white">
        Checking Your Eligibility...
      </h1>
      <p className="mx-auto text-center text-sm font-normal text-gray-500 md:text-base dark:text-gray-400">
        Please wait a moment while we confirm your eligibility
      </p>
      <Spinner className="my-2" helper="Checking... 3 seconds remaining" />
    </div>
  );
};

export default Loading;
