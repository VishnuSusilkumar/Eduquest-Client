"use client";
import BasicTable from "../../../utils/BasicTable";
import Sidebar from "../../../components/Instructor/Sidebar/Sidebar";
import Heading from "../../../utils/Heading";
import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import { useGetCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import { useRouter } from "next/navigation";
import DashboardHero from "../../../components/Admin/DashboardHero";

type Props = {};

const CoursesPage = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const router = useRouter();

  const { isLoading, data, refetch } = useGetCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const columns = [
    {
      header: "Course Title",
      accessorKey: "name",
    },
    {
      header: "Ratings",
      accessorKey: "ratings",
    },
    {
      header: "Purchased",
      accessorKey: "purchased",
    },
    {
      header: "CreatedAt",
      accessorKey: "createdAt",
      cell: (info: any) => (
        <>
          {info.row.original.createdAt
            ? new Date(info.row.original.createdAt).toLocaleDateString()
            : ""}
        </>
      ),
    },
    {
      header: "Edit",
      cell: (info: any) => (
        <>
          <PencilIcon
            size={20}
            className="cursor-pointer"
            onClick={() =>
              router.push(`/instructor/edit-course/${info.row.original._id}`)
            }
          />
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* <InstructorProtected> */}
      <Heading
        title="Eduquest - Instructor"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          <div className="z-[99]">{data && <DashboardHero />}</div>
          {data && (
            <div
              className={`bg-white dark:bg-gray-800  shadow-md sm:rounded-sm overflow-hidden mx-28 p-4 mt-10 z-[10]`}
            >
              <BasicTable datas={data} columns={columns} type="category" />
            </div>
          )}
        </div>
        <Sidebar active={1} />
      </div>

      {/* </InstructorProtected> */}
    </div>
  );
};

export default CoursesPage;
