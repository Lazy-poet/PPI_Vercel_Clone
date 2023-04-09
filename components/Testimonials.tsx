import Image from "next/image";
const Testimonials = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            What our customers are saying
          </h2>
          <p className="mb-8 font-light text-gray-500 lg:mb-16 dark:text-gray-400 sm:text-xl">
            {" "}
            Find out why we&apos;re the trusted choice for tax refunds on
            mis-sold financial products, including PPI, payday loans, and
            packaged bank accounts
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Great Service and Easy Process
                </h3>
                <p className="my-4">
                  &ldquo;As a retired woman, I was nervous about using a
                  financial service provider, but QuickTaxClaims made the
                  process of getting a tax refund on my mis-sold PPI payout so
                  easy and stress-free. Their team was knowledgeable and
                  communicative throughout, and I received a significant refund
                  that I never would have been able to get on my own. Highly
                  recommended!&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />

                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Susan J.</div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Excellent Help and Professional Service
                </h3>
                <p className="my-4">
                  &ldquo;As a basic rate taxpayer, I wasn&apos;t sure if it was
                  worth my time to claim a tax refund on my mis-sold packaged
                  bank account, but QuickTaxClaims made it clear from the start
                  that their fees were 48% of the refund amount. Their team was
                  professional and knowledgeable throughout the process, and I
                  received a great refund that helped me out when I needed it
                  most.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div> Peter D.</div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Speechless with how easy this was to integrate
                </h3>
                <p className="my-4">
                  &ldquo;I had a lot of concerns about mis-sold financial
                  products, but QuickTaxClaims helped me understand my rights
                  and guided me through the process of getting a tax refund on
                  my mis-sold payday loan payout. Their team was friendly,
                  approachable, and professional, and I&apos;m so grateful for
                  their help.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div> Emily W.</div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="space-y-6">
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Clear and Transparent Information
                </h3>
                <p className="my-4">
                  &ldquo;I was hesitant to use a financial service provider, but
                  QuickTaxClaims provided clear and transparent information
                  about their process and fees. Their team was knowledgeable and
                  communicative throughout the process of getting me a tax
                  refund on my mis-sold PPI payout, and I received a great
                  refund that helped me out when I needed it most.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>John R.</div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Highly Recommend for Retirees
                </h3>
                <p className="my-4">
                  I&apos;m a retired woman and wasn&apos;t sure if I was
                  eligible for a tax refund on my mis-sold financial product,
                  but QuickTaxClaims helped me understand my options and guided
                  me through the process with ease. Their team was friendly and
                  approachable, and I would highly recommend their service to
                  anyone looking to claim what&apos;s rightfully theirs.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Margaret S.</div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  No-Win, No-Fee Guarantee
                </h3>
                <p className="my-4">
                  &ldquo;I&apos;m a basic rate taxpayer and wasn&apos;t sure if
                  I was eligible for a tax refund on my mis-sold financial
                  product, but QuickTaxClaims made it clear that their service
                  was no-win, no-fee. Their team was professional and
                  knowledgeable throughout the process, and I received a great
                  refund that I never would have been able to get on my
                  own.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Michael H.</div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="space-y-6">
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Expertise and Professionalism
                </h3>
                <p className="my-4">
                  &ldquo;As someone who didn&apos;t know much about tax refunds,
                  I was hesitant to use a financial service provider, but
                  QuickTaxClaims provided the expertise and professionalism I
                  was looking for. Their team was friendly and approachable, and
                  they helped me get a great tax refund on my mis-sold financial
                  product payout.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Jane M.</div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Great Results and No Surprises
                </h3>
                <p className="my-4">
                  &ldquo;I was worried about hidden fees or upfront costs when
                  using a financial service provider, but QuickTaxClaims made it
                  clear from the start that their fees were 48% of the tax
                  refund amount. Their team was professional and communicative
                  throughout the process, and I received a great refund on my
                  mis-sold financial product payout.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Mark K.</div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Trustworthy and Helpful
                </h3>
                <p className="my-4">
                  &ldquo;I had concerns about the legitimacy of the process, but
                  QuickTaxClaims provided clear and trustworthy information
                  about their service. Their team was approachable and
                  helpful&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Sarah B.</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
