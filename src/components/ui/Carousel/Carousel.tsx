"use client";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGetTrendingCoursesMutation } from "../../../../redux/features/courses/coursesApi";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";

type Props = {};

const Carousell = (props: Props) => {
  const router = useRouter();
  const [courses, { isLoading, error }] = useGetTrendingCoursesMutation();
  const [trendingCourses, setTrendingCourses] = useState<any>([]);

  const fetchData = async () => {
    const data: any = await courses(null);
    setTrendingCourses(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<CustomButtonGroup />}
      >
        {trendingCourses?.length
          ? trendingCourses.map((course: any, index: number) => (
              <div
                key={index}
                className="relative flex flex-col mt-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-sm w-52 800px:w-64 800px:max-h-72 max-h-52 800px:min-h-72 min-h-52 cursor-pointer"
                onClick={() => router.push(`course/${course._id}`)}
              >
                <div className="relative min-h-28 800px:min-h-40 mx-2 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-sm bg-blue-gray-500 shadow-blue-gray-500/40">
                  <img
                    src={course?.thumbnail}
                    alt="card-image"
                    className="transition-transform transform hover:scale-105 800px:min-h-40 min-h-32"
                  />
                </div>
                <div className="p-4">
                  <h5 className="block mb-1 text-xs 800px:text-sm antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {course.name}
                  </h5>
                  <p className="text-xs hidden 800px:block antialiased font-light leading-relaxed text-inherit overflow-hidden ">
                    {course.description.length > 100
                      ? course.description.substring(0, 100) + "..."
                      : course.description}
                  </p>
                  <p className="block 800px:hidden text-xs antialiased font-light leading-relaxed text-inherit overflow-hidden ">
                    {course.description.length > 100
                      ? course.description.substring(0, 50) + "..."
                      : course.description}
                  </p>
                </div>
              </div>
            ))
          : [...Array(8)].map((item: string, index: number) => (
              <div
                key={index}
                className="relative flex flex-col mt-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-sm w-52 800px:w-64 800px:max-h-72 max-h-52 800px:min-h-72 min-h-52 cursor-pointer"
              >
                {/* Skeleton for image */}
                <div className="animate-pulse relative min-h-28 800px:min-h-40 mx-2 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-sm bg-blue-gray-500 shadow-blue-gray-500/40">
                  <div className="bg-gray-300 h-full w-full"></div>
                </div>
                {/* Skeleton for title */}
                <div className="p-4">
                  <div className="animate-pulse h-4 w-1/2 bg-gray-300 mb-2"></div>
                  <div className="animate-pulse h-3 w-3/4 bg-gray-300"></div>
                </div>
                {/* Skeleton for description */}
                <div className="p-4">
                  <div className="animate-pulse h-3 w-5/6 bg-gray-300 mb-2"></div>
                  <div className="animate-pulse h-3 w-full bg-gray-300"></div>
                </div>
              </div>
            ))}
      </Carousel>
    </div>
  );
};

const CustomButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group -ml-20 800px:-ml-40 -mt-14 800px:gap-3">
      <button className="carousel-button" onClick={previous}>
        <ArrowLeftCircleIcon className="800px:h-12 h-8 800px:w-12" />
      </button>
      <button className="carousel-button" onClick={next}>
        <ArrowRightCircleIcon className="800px:h-12 h-8 w-12 " />
      </button>
    </div>
  );
};

export const CourseCard = ({ index, course }: any) => {
  const router = useRouter();

  if (course.isBlocked) {
    return null;
  }

  return (
    <div key={index + 1} className="items-center justify-center w-full flex">
      <div
        className="border border-gray-400  relative flex flex-col mt-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-sm w-52 800px:w-64 800px:max-h-72 max-h-52 800px:min-h-72 min-h-52 cursor-pointer"
        onClick={() => router.push(`course/${course._id}`)}
      >
        <div className="relative min-h-28 800px:min-h-40 mx-2 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-sm bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            src={course?.thumbnail}
            alt="card-image"
            className="transition-transform transform hover:scale-105 800px:min-h-40 min-h-32"
          />
        </div>
        <div className="p-4">
          <h5 className="block mb-1 text-xs 800px:text-sm antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {course.name}
          </h5>
          <p className="text-xs hidden 800px:block antialiased font-light leading-relaxed text-inherit overflow-hidden ">
            {course.description.length > 100
              ? course.description.substring(0, 100) + "..."
              : course.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const EnrolledCourseCard = ({ index, course, onReportClick }: any) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (course.isBlocked) {
    return null; 
  }

  return (
    <div
      key={index + 1}
      className="relative flex flex-col mt-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-sm w-52 800px:w-64 800px:max-h-72 max-h-52 800px:min-h-72 min-h-52 cursor-pointer"
      onClick={() => router.push(`course/${course._id}`)}
    >
      <div className="relative min-h-28 800px:min-h-40 mx-2 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-sm bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={course?.thumbnail}
          alt="card-image"
          className="transition-transform transform hover:scale-105 800px:min-h-40 min-h-32"
        />
      </div>
      <div className="p-4 relative">
        <div className="flex justify-between items-center">
          <h5 className="text-xs 800px:text-sm antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {course.name}
          </h5>
          <BsThreeDots
            className="cursor-pointer text-gray-700 dark:text-white"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
          />
        </div>
        <p className="text-xs hidden 800px:block antialiased font-light leading-relaxed text-inherit overflow-hidden">
          {course.description.length > 100
            ? course.description.substring(0, 100) + "..."
            : course.description}
        </p>

        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-8 right-0 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 shadow-lg z-10 mt-2"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReportClick(course);
                setDropdownOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-white whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Report Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousell;
