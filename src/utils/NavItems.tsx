import Link from "next/link";
import React, { useEffect, useState } from "react";
import { socketId } from "./socket";
import { SignalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export const navItemsData = [
  {
    name: "Home +",
    url: "/",
  },
  {
    name: "Course +",
    url: "/courses",
  },
  {
    name: "About +",
    url: "/#aboutus",
  },
  {
    name: "Become a Instructor",
    url: "/instructor/register",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  user: any;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile, user }) => {
  const [streamId, setStreamId] = useState("");
  const router = useRouter();
  const handleNotification = (data: any) => {
    const isAnyCourseIdMatching = user?.courses?.some((userCourse: any) =>
      data?.courses?.some(
        (course: any) => course.courseId === userCourse.courseId
      )
    );
    if (isAnyCourseIdMatching) {
      setStreamId(data.streamId);
    }
  };

  useEffect(() => {
    socketId.on("joinStream", (data) => {
      handleNotification(data);
    });

    return () => {
      socketId.off("joinStream");
    };
  }, [user]);

  return (
    <>
      <div className="hidden px-3 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) =>
            i.name === "Become a Instructor" &&
            user &&
            user.role === "user" &&
            !user.courses ? (
              <Link href={`${i.url}`} key={index} passHref>
                <div
                  className={`
                            ${
                              activeItem === index
                                ? "font-[550] "
                                : "text-black "
                            }  w-44 text-center font-Poppins  text-[14px] font-[400] tracking-wide hover:font-[600]`}
                >
                  <span>{i.name}</span>
                </div>
              </Link>
            ) : (
              i.name !== "Become a Instructor" && (
                <Link href={`${i.url}`} key={index} passHref>
                  <div
                    className={`
                            ${
                              activeItem === index
                                ? "font-[550]  text-black"
                                : "text-black"
                            }  w-24 text-center font-Poppins  text-[14px] font-[400] tracking-wide hover:font-[600]`}
                  >
                    <span>{i.name}</span>
                  </div>
                </Link>
              )
            )
          )}
        {streamId && (
          <Link
            className="relative mr-8 cursor-pointer "
            href={`/live/?caller-id=${streamId}`}
          >
            <SignalIcon className="cursor-pointer h-5 w-5 text-2xl text-black" />
            <span className="absolute -right-0 -top-0 flex h-[7px] w-[7px] items-center justify-center rounded-full bg-[#3ccba0] text-xs text-white"></span>
          </Link>
        )}
      </div>

      {isMobile && (
        <div className="mt-5 800px:hidden">
          <div className="w-full py-6 text-center">
            <Link href="/" passHref>
              <span className="font-Poppins text-[25px] font-[500] text-black ">
                Eduquest
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href={i.url} passHref key={index}>
                <span
                  className={`
                                ${
                                  activeItem === index
                                    ? "text-[#FDC021] dark:text-[#37a39a]"
                                    : "text-black "
                                }
                                block px-6 py-5 font-Poppins text-[16px] font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
