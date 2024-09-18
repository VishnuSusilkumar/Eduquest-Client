"use client";
import { Badge } from "../Badge";
import React from "react";

type Props = {};

const AboutUs: React.FC<Props> = () => {
  return (
    <div>
      <div className="relative z-0 text-black">
        <div className="absolute inset-0  flex flex-col items-end justify-center gap-0 pr-[12%] 800px:gap-3">
          <span className="text-center text-xl font-[1000] md:text-6xl lg:text-6xl xl:text-6xl">
            About Us
          </span>

          <span className="relative flex">
            <span className="absolute bottom-0 right-0 z-[1] h-1 w-12 bg-[#FDC021] 800px:h-3 800px:w-[7.5rem]"></span>
            <span className="z-[2] text-center text-xl md:text-6xl lg:text-7xl xl:text-6xl ">
              Fake or Real
            </span>
          </span>
          <span className="mb-3 hidden text-sm 800px:block 800px:w-[24%] mt-6">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. Versions of the Lorem
            ipsum text have been used in typesetting at least since the 1960s,
            when it was popularized by advertisements for Letraset transfer
            sheets. Lorem ipsum was introduced to templates for its desktop
            publishing program PageMaker. as have many LaTeX packages, web
            content managers such as Joomla! and WordPress, and CSS libraries.
            <br />
            <br />
            <Badge text="Explore More" arrow />
          </span>
        </div>
        <img src="/assets/aboutus.png" className="min-h-full w-full bg-cover" />
      </div>
    </div>
  );
};

export default AboutUs;
