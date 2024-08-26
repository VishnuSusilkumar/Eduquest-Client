"use client";
import { Badge } from "../Badge";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  setOpen: any;
};

const Banner: React.FC<Props> = ({ setOpen }) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="relative 800px:-mt-28 z-0 dark:text-black">
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-[12%] gap-0 800px:gap-3">
        <span className="text-xl md:text-6xl lg:text-6xl xl:text-6xl font-[1000] text-center">
          The Best
        </span>
        <span className="text-xl md:text-6xl lg:text-6xl xl:text-6xl font-[1000] text-center">
          Platform Enroll
        </span>
        <span className="text-xl md:text-6xl lg:text-6xl xl:text-6xl text-center ">
          in Your Special
        </span>
        <span className="relative flex">
          <span className="bg-[#FDC021] w-16 800px:w-44 h-1 800px:h-3 absolute bottom-0 left-1 z-[1]"></span>
          <span className="text-xl md:text-6xl lg:text-7xl xl:text-6xl text-center z-[2] ">
            Course
          </span>
        </span>
        <span className="text-sm hidden 800px:w-[30%] 800px:block mb-3">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </span>
        <span onClick={() => setOpen(true)}>
          {!user && <Badge text="Get Started" arrow />}
        </span>
      </div>
      <img src="/assets/grow bb.png" className="bg-cover w-full min-h-full" />
    </div>
  );
};

export default Banner;
