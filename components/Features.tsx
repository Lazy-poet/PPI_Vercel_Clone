import Image from "next/image";
import Feature1 from "@/public/images/feature-1.png";
import Feature2 from "@/public/images/feature-2.png";
import Feature3 from "@/public/images/feature-3.png";
import Feature4 from "@/public/images/feature-4.png";

type Props = {};

const Features = (props: Props) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-xl ">
        <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 md:mb-8 lg:mb-16 dark:text-white md:text-4xl">
          PPI tax refunds has featured on
        </h2>
        <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 xl:gap-8 sm:space-y-0 md:mb-8 md:mt-12">
          <a
            href="https://www.itv.com/thismorning/articles/did-you-know-you-can-get-ppi-payout-tax-back"
            className="block py-12 px-8 text-center bg-gray-50 rounded dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
        
          >
            <Image
              src={Feature1}
              alt=""
              className="mx-auto text-gray-600 dark:text-gray-400"
            />
          </a>
          <a
            href="https://www.dailymail.co.uk/news/article-8610431/New-PPI-gold-rush-Ruling-hidden-fees-spark-millions-fresh-payout-claims.html"
            className="block py-12 px-8 text-center bg-gray-50 rounded dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Image
              src={Feature2}
              alt=""
              className="mx-auto text-gray-600 dark:text-gray-400"
            />
          </a>
          <a
            href="https://www.mirror.co.uk/money/martin-lewis-tells-millions-brits-21425465"
            className="block py-12 px-8 text-center bg-gray-50 rounded dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Image
              src={Feature3}
              alt=""
              className="mx-auto text-gray-600 dark:text-gray-400"
            />
          </a>
          <a
            href="https://www.bbc.co.uk/news/business-15701101"
            className="block py-12 px-8 text-center bg-gray-50 rounded dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Image
              src={Feature4}
              alt=""
              className="mx-auto text-gray-600 dark:text-gray-400"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
