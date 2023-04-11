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
                  Pleasantly Surprised by Unexpected Successful PPI Tax Refund
                </h3>
                <p className="my-4">
                  &ldquo;I wasn&apos;t expecting anything from my PPI tax refund
                  claim, but I was pleasantly surprised when I received a
                  substantial refund through the post. The process was
                  straightforward, and my wife filled in the application form
                  online. We had been previously told that she was not entitled
                  to a refund, but this service proved us wrong. Thank you for
                  the great service!&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="/images/profile/Laura Davis.jpeg"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />

                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Laura Davis</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Manchester
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Legitimate Service that Delivers
                </h3>
                <p className="my-4">
                  &ldquo;I was a bit sceptical at first, but I decided to give
                  this service a try. I&apos;m happy to report that it is a
                  legitimate service that delivers. The process was efficient,
                  and I completed everything over the phone and signed up
                  electronically. Although it took a long time, I understand
                  that there was a backlog due to Covid. In the end, the claim
                  was directly paid into my bank account, and I am happy with
                  the outcome.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="/images/profile/Farrah Hussein.jpeg"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div> Farah Hussain</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Birmingham
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Excellent Customer Service and Experience
                </h3>
                <p className="my-4">
                  &ldquo;From start to finish, my experience with this service
                  was excellent. The staff explained everything clearly, and I
                  felt well-informed throughout the process. The claims handlers
                  were courteous and polite, and the monies due were paid
                  promptly. Overall, it was a stress-free and efficient
                  experience. Thank you for making life a little easier.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="/images/profile/Mark Taylor.jpeg"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div> Mark Taylor</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Leeds
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="space-y-6">
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Easy Process with Minimal Effort Required
                </h3>
                <p className="my-4">
                  &ldquo;I found this service to be very easy to use. Although
                  it did take a while for the claim and payment, there was
                  minimal effort required on my part. Once the claim was
                  finalized, the money was put straight into my bank account. I
                  can&apos;t find any faults with the process, and I would
                  recommend this service to anyone who needs it.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="/images/profile/Emily Patel.jpeg"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Emily Patel</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    London
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Trustworthy and Efficient Service
                </h3>
                <p className="my-4">
                  I was a little bit worried about using an online firm for my
                  PPI tax refund claim. However, my experience with this service
                  was excellent. They explained everything clearly, and I felt
                  like I could trust them. It was well worth the fees, as I
                  couldn&apos;t have done this on my own. They paid what was
                  owed to me promptly into my account, and the staff were all
                  very helpful.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="/images/profile/Sarah Higgins.jpeg"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Sarah Higgins</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Glasgow
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Surprisingly Quick and Thorough Service
                </h3>
                <p className="my-4">
                  &ldquo;I had never used this service before, but they were so
                  helpful and thorough. They were quick to respond to all my
                  messages, and I was surprised by how fast everything went. I
                  ended up with a nice bonus at a much-needed time, and I
                  couldn&apos;t be happier. I would definitely recommend this
                  service to anyone who needs it.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="/images/profile/David Wilson.jpeg"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>David Wilson</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Liverpool
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="space-y-6">
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Trustworthy and Polite Customer Service
                </h3>
                <p className="my-4">
                  &ldquo;I was initially sceptical about using this service, but
                  I was pleasantly surprised. The customer service was fast,
                  efficient and polite, and they explained everything clearly.
                  I&apos;m so pleased I trusted them, and the refund was a
                  fantastic outcome. Thank you for a great experience.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="/images/profile/Racheal Green.jpeg"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Rachel Green</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Bristol
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Great Experience with an Online Firm
                </h3>
                <p className="my-4">
                  &ldquo;I am always a little bit worried about using online
                  firms, but my experience with this service was great. The
                  process was straightforward, and the staff were all very
                  helpful. I would totally recommend this service to anyone who
                  needs it, and I&apos;m 100% satisfied with the outcome.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="/images/profile/Michael Thompson.jpeg"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Michael Thompson</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Newcastle
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="p-6 bg-gray-50 rounded dark:bg-gray-800">
              <blockquote className="text-sm text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Hassle-Free Experience with a Great Refund
                </h3>
                <p className="my-4">
                  &ldquo;I had an excellent experience with this service. It was
                  hassle-free, and they did all the work for me. The refund was
                  great, and it was unexpected, which was a fantastic bonus. I
                  couldn&apos;t have asked for a better outcome, and I would
                  highly recommend this service to anyone who needs it.&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center space-x-3">
                <Image
                  src="/images/profile/Aneta Zakova .jpeg"
                  className="w-9 h-9 rounded-full"
                  width={36}
                  height={36}
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white">
                  <div>Aneta Zakova</div>
                  <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Cardiff
                  </div>
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
