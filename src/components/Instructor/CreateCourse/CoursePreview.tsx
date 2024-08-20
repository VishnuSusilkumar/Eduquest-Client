import React from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "@/styles/style";
import Ratings from "../../../utils/Ratings";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

const CoursePreview: React.FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}) => {
  const prevButton = () => {
    setActive(active - 1);
  };

  const estimatedPrice = courseData?.estimatedPrice || 0;
  const price = courseData?.price || 0;

  const discount = ((estimatedPrice - price) / estimatedPrice) * 100;
  const discountPrice = discount.toFixed(0);
  return (
    <div className="m-auto py-5 mb-5 font-Poppins ">
      <div className="w-full relative z-[-1]">
        {/* <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div> */}
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? (
              "Free"
            ) : (
              <>&#x20b9; {courseData?.price}</>
            )}
          </h1>
          <h5 className="pl-4 text-[18px] pt-5 line-through opacity-80 text-gray-700">
            &#x20b9; {courseData?.estimatedPrice}
          </h5>
          <h4 className="pl-3 pt-4 text-[22px]">
            <span className="text-green-500">{discountPrice}% </span>off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} text-white !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now &#x20b9; {courseData?.price}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="coupon code"
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !bg-gradient-to-tr from-indigo-200 to-indigo-400 !w-[120px] my-3 ml-4 font-Poppins cursor-pointer text-white !text-[14px]`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1">* Source code included</p>
        <p className="pb-1">* Full life time access</p>
        <p className="pb-1">* Certificates of Completion</p>
        <p className="pb-3 800px:pb-6">* Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[22px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center gap-2 pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 students</h5>
          </div>
          <br />
          <h1 className="text-[23px] font-Poppins font-[600]">
            what you will learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoMdCheckmark size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className="text-[23px] font-Poppins font-[600]">
          what are the prequisites for starting this course?
        </h1>

        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoMdCheckmark size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          {courseData?.description}
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <div
          className="w-full 800px:w-[180px] h-[40px] bg-gradient-to-tr from-indigo-200 to-indigo-400 text-center text-[#fff] rounded cursor-pointer  pt-2"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="1100px:mr-16  w-full 800px:w-[180px] h-[40px] bg-gradient-to-tr from-indigo-200 to-indigo-400 text-center text-[#fff] rounded pt-2 cursor-pointer"
          onClick={() => handleCourseCreate()}
        >
          Create
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
