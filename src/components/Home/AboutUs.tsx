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
            Eduquest is a comprehensive e-learning platform designed to connect
            students with expert instructors in various fields. It offers a wide
            range of courses, interactive learning tools, and real-time
            engagement features. Instructors can track analytics via
            personalized dashboards, while students benefit from video
            tutorials, quizzes, and assignments. The platform supports in-app
            notifications, course reviews, and rating options, enhancing the
            learning experience. Eduquest prioritizes user-friendly design,
            responsive search, and secure video access, making it an ideal
            choice for learners and educators alike.
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
