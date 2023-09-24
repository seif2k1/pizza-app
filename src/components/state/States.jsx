"use client";
import Image from "next/image";
import { urlFor } from "../../../lib/client";

const States = ({ data, number }) => {
  return (
    <div>
      <div className=" lg:h-[32rem] lg:w-[32rem] md:w-[30rem] md:h-[30rem] w-[20rem] h-[20rem]  flex items-center justify-center relative overflow-hidden ">
        {data ? (
          <Image
            loader={() => urlFor(data)}
            src={urlFor(data)}
            className={`${
              number === 0
                ? "scale-[0.7]"
                : number === 1
                ? "scale-[0.85]"
                : number === 2
                ? "scale-[1]"
                : ""
            } absolute inset-0  duration-[1.1s] `}
            objectFit="cover"
            layout="fill"
            alt={""}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default States;
