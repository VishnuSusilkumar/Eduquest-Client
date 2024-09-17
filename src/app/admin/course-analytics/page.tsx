"use client";
import DashboardHero from "../../../components/Instructor/DashboardHero";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Heading from "../../../utils/Heading";
import React from "react";
import { useSelector } from "react-redux";
import CourseAnalytics from "@/components/Admin/Analytics/CourseAnalytics";
type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      
      <Heading
        title="Eduquest - Instructor | Course Analytics"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          <div className="z-[99]">
            {user && <DashboardHero instructorId={user._id} />}
          </div>
          <CourseAnalytics />
        </div>
        <Sidebar active={-1} />
      </div>
     
    </div>
  );
};

export default Page;
