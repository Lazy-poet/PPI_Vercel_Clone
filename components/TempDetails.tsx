import { useSystemValues } from "@/contexts/ValueContext";
import React from "react";
import Contact from "@/components/steps/Contact";
type Props = {};

const TempDetails = (props: Props) => {
  return (
    <div className="max-h-0 overflow-hidden">
      <Contact />
    </div>
  );
};

export default TempDetails;
