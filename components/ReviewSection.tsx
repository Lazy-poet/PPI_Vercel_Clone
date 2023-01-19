import Image from "next/image";

const ReviewSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <figure className="max-w-screen-md mx-auto">
          <Image
            className="mx-auto p-2 rounded-full ring-4 ring-gray-300 dark:ring-gray-500 mb-3 lg:mb-5"
            src="/images/reviewer-photo.jpg"
            alt="profile picture"
            width={144}
            height={144}
          />
          <div
            className="text-white"
            // @ts-ignore
            src="https://cdn.trustindex.io/loader.js?1b5197711c6c13477e760d58dd2"
          ></div>
          <blockquote>
            <p className="text-2xl font-medium text-gray-900 dark:text-white">
              &quot;Quick and easy form, and it took just a minute to complete.
              I was delighted to get a tax refund for something I didn&apos;t even
              know I was entitled to!&quot;
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <Image
              className="p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src="/images/reviewer-photo.jpg"
              alt="profile picture"
              width={40}
              height={40}
            />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">
                Sanya
              </div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                Google rating
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ReviewSection;
