const ReviewSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <figure className="max-w-screen-md mx-auto">
          <img
            className="mx-auto p-2 w-36 h-36 rounded-full ring-4 ring-gray-300 dark:ring-gray-500 mb-3 lg:mb-5"
            src="/images/reviewer-photo.jpg"
            alt="profile picture"
          />
          <div
            // @ts-ignore
            src="https://cdn.trustindex.io/loader.js?1b5197711c6c13477e760d58dd2"
          ></div>
          <blockquote>
            <p className="text-2xl font-medium text-gray-900 dark:text-white">
              &quot;Very speedy response & questions easy to answer; form really
              did take just 3 minutes to complete which won&apos;t break the
              bank but might just earn you some cash to put in it.&quot;
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <img
              className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src="/images/reviewer-photo.jpg"
              alt="profile picture"
            />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">
                Sanya
              </div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                from reviews.io
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ReviewSection;
