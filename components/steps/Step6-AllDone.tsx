import Title from "@/components/Title";
import { useState } from "react";
const AllDone = () => {
  const [slide, setslide] = useState(false)
  return <>
  <div className={` ${slide ? 'transition' : 'step_6 step'}`}>
  <Title step={5} />
  </div>
  </>;
};

export default AllDone;
