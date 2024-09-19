"use client";
import { Badge } from "../Badge";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  setOpen: any;
};

const Banner: React.FC<Props> = ({ setOpen }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative 800px:-mt-28 z-0 dark:text-black">
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-[12%] gap-0 800px:gap-3">
        <div className="text-xl md:text-6xl lg:text-6xl xl:text-6xl font-[1000] text-center">
          The Best
        </div>
        <div className="text-xl md:text-6xl lg:text-6xl xl:text-6xl font-[1000] text-center">
          Platform Enroll
        </div>
        <div className="text-xl md:text-6xl lg:text-6xl xl:text-6xl text-center">
          in Your Special
        </div>
        <div className="relative flex">
          <div className="bg-[#FDC021] w-16 800px:w-44 h-1 800px:h-3 absolute bottom-0 left-1 z-[1]"></div>
          <div className="text-xl md:text-6xl lg:text-7xl xl:text-6xl text-center z-[2]">
            Course
          </div>
        </div>
        <div className="text-sm hidden 800px:w-[30%] 800px:block mb-3">
          EduQuest empowers learners with a wide range of interactive courses,
          live streams, and real-time chat, creating a seamless e-learning
          experience for all users.
        </div>
        {isClient && (
          <div onClick={() => setOpen(true)}>
            {!user && <Badge text="Get Started" arrow />}
          </div>
        )}
      </div>
      <img src="/assets/grow bb.png" className="bg-cover w-full min-h-full" />
    </div>
  );
};

export default Banner;
