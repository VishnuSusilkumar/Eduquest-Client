"use client";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import DashboardHero from "../../../components/Instructor/DashboardHero";
import Heading from "../../../utils/Heading";
import React from "react";
import EditFAQ from "../../../components/Admin/Customization/EditFAQ";
import { AdminSidebar } from "@/constants/enums";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    // <AdminProtected>
    <div className="min-h-screen bg-gray-200">
      <Heading
        title="Eduquest - Admin | FAQ"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%] ">
          <DashboardHero instructorId={user._id} />

          <EditFAQ />
        </div>
        <Sidebar active={AdminSidebar.faq} />
      </div>
    </div>
    // </AdminProtected>
  );
};

export default Page;
