import { STEP } from "@/libs/constants";
import { SIDE_INFO } from "@/libs/doms";

type Props = {
  step: STEP;
};

const SideItem = ({ info }: { info: string }) => {
  return (
    <li className="flex items-center space-x-3">
      <svg
        className="flex-shrink-0 w-5 h-5 text-green-300"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span>{info}</span>
    </li>
  );
};

const SidePanel = ({ step }: Props) => {
  return (
    <div className="hidden w-full max-w-md p-12 lg:h-auto lg:block bg-primary-600">
      <div className="block p-8 text-white rounded-lg bg-primary-500">
        <h3 className="mb-1 text-2xl font-semibold">Your £624 tax refund</h3>

        <p className="inline-flex justify-center items-center space-x-1.5 mb-4 font-light text-primary-100 sm:text-lg">
          {step != STEP.ALL_DONE && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="bi bi-info-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
              <span>More information required</span>
            </>
          )}
        </p>

        <ul role="list" className="space-y-4 text-left">
          {step == STEP.QUICK_QUOTE &&
            SIDE_INFO.slice(0, 1).map((info, index) => {
              return <SideItem key={index} info={info} />;
            })}
          {step == STEP.CLAIM_NOW &&
            SIDE_INFO.slice(0, 2).map((info, index) => {
              return <SideItem key={index} info={info} />;
            })}
          {step == STEP.SIGN_COMPLETE &&
            SIDE_INFO.slice(0, 3).map((info, index) => {
              return <SideItem key={index} info={info} />;
            })}
          {step == STEP.LAST_THING &&
            SIDE_INFO.slice(0, 4).map((info, index) => {
              return <SideItem key={index} info={info} />;
            })}
          {step == STEP.THANK_YOU &&
            SIDE_INFO.map((info, index) => {
              return <SideItem key={index} info={info} />;
            })}
          {step == STEP.ALL_DONE &&
            SIDE_INFO.map((info, index) => {
              return <SideItem key={index} info={info} />;
            })}
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
