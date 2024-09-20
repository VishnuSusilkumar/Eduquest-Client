"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import DashboardHero from "../../../components/Instructor/DashboardHero";
import Heading from "../../../utils/Heading";
import {
  useGetInstructorCoursesQuery,
  useBlockCourseMutation,
  useUnBlockCourseMutation,
} from "../../../../redux/features/admin/adminApi";
import { toast } from "sonner";
import BasicTable from "../../../utils/BasicTable";
import CustomActionModal from "@/components/Admin/ViewModal/CustomActionModal";
import { AdminSidebar } from "@/constants/enums";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [actionType, setActionType] = useState<"block" | "unblock">("block");

  const { isLoading, data, error, refetch } = useGetInstructorCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [
    blockCourse,
    { isLoading: blockLoading, error: blockError, isSuccess: blockSuccess },
  ] = useBlockCourseMutation();
  const [
    unBlockCourse,
    {
      isLoading: unBlockLoading,
      error: unBlockError,
      isSuccess: unBlockSuccess,
    },
  ] = useUnBlockCourseMutation();

  useEffect(() => {
    if (blockSuccess || unBlockSuccess) {
      toast.success(
        actionType === "block"
          ? "Course blocked successfully"
          : "Course unblocked successfully"
      );
      refetch();
    }

    if (blockError || unBlockError) {
      const error = blockError || unBlockError;
      if (error) {
        console.error("Error:", error);
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [blockSuccess, unBlockSuccess, blockError, unBlockError]);

  const handleAction = async () => {
    setOpen(false);
    const id = courseId;
    try {
      if (actionType === "block") {
        await blockCourse({ id });
      } else {
        await unBlockCourse({ id });
      }
    } catch (error) {
      console.error("Action Error:", error);
    }
  };

  const columns = [
    {
      header: "Course Name",
      accessorKey: "name",
    },
    {
      header: "Instructor",
      accessorKey: "instructorDetails.name",
      cell: (info: any) => (
        <>{info?.row?.original?.instructorDetails?.name || "N/A"}</>
      ),
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: (info: any) => (
        <>
          {info?.row?.original?.createdAt
            ? new Date(info.row.original.createdAt).toLocaleDateString()
            : ""}
        </>
      ),
    },
    {
      header: "Status",
      accessorKey: "isBlocked",
      cell: (info: any) => (
        <>{info.row.original.isBlocked ? "Blocked" : "Active"}</>
      ),
    },
    {
      header: "Action",
      cell: (info: any) => (
        <>
          {info.row.original.isBlocked ? (
            <button
              onClick={() => {
                setCourseId(info.row.original._id);
                setActionType("unblock");
                setOpen(true);
              }}
              className="text-green-600 cursor-pointer"
            >
              Unblock
            </button>
          ) : (
            <button
              onClick={() => {
                setCourseId(info.row.original._id);
                setActionType("block");
                setOpen(true);
              }}
              className="text-red-600 cursor-pointer"
            >
              Block
            </button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      <Heading
        title="Eduquest - Admin - Courses"
        description="Manage the courses available on the platform"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%]">
          <DashboardHero instructorId={user._id} />
          {data && (
            <div
              className={`bg-white dark:bg-gray-800 relative shadow-md sm:rounded-sm overflow-hidden mx-28 p-4`}
            >
              <BasicTable datas={data} columns={columns} type="course" />
            </div>
          )}
        </div>
        <Sidebar active={AdminSidebar.courses} />
      </div>
      {open && (
        <CustomActionModal
          open={open}
          setOpen={setOpen}
          handleFunction={handleAction}
          text={
            actionType === "block"
              ? "Are you sure you want to block this course?"
              : "Are you sure you want to unblock this course?"
          }
          confirmText={
            actionType === "block" ? "Block Course" : "Unblock Course"
          }
        />
      )}
    </div>
  );
};

export default Page;
