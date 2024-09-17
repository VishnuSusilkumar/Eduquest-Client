import React, { useState } from "react";
import { useGetUserCoursesQuery } from "../../../redux/features/courses/coursesApi";
import { EnrolledCourseCard } from "../ui/Carousel/Carousel";
import ReportCourseModal from "./ReportCourseModal"; 

type Props = {};

const EnrolledCourses = (props: Props) => {
  const { data } = useGetUserCoursesQuery("", {});
  const [selectedCourse, setSelectedCourse] = useState<any>(null); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  const handleReportClick = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block !text-lg 800px:text-[30px] font-Poppins text-start mb-4 font-[500] text-black dark:text-[#fff] pb-2">
        Enrolled Courses
      </h1>
      <div className="w-full grid grid-cols-3 gap-2">
        {data &&
          data.map((item: any, index: number) => (
            <EnrolledCourseCard
              key={index}
              index={index}
              course={item}
              onReportClick={handleReportClick}
            />
          ))}
      </div>

      {/* Modal for reporting a course */}
      {isModalOpen && selectedCourse && (
        <ReportCourseModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EnrolledCourses;
