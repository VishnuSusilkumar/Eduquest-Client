"use client";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import DashboardHero from "../../../components/Admin/DashboardHero";
import Heading from "../../../utils/Heading";
import React, { use, useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetInstructorsQuery,
} from "../../../../redux/features/admin/adminApi";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import BasicTable from "../../../utils/BasicTable";
import CustomDeleteModal from "@/components/ui/CustomDeleteModal";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { isLoading, data, refetch } = useGetInstructorsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isLoading: deleteLoading, error, isSuccess }] =
    useDeleteUserMutation();

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Joined At",
      accessorKey: "createdAt",
      cell: (info: any) => (
        <>
          {info?.row?.original.createdAt
            ? new Date(info.row.original.createdAt).toLocaleDateString()
            : ""}
        </>
      ),
    },
    {
      header: "Verified",
      accessorKey: "isVerified",
    },
    {
      header: "Delete",
      cell: (info: any) => (
        <>
          <Trash2
            size={20}
            onClick={() => {
              setOpen(true);
              setUserId(info.row.original._id);
            }}
            className="cursor-pointer"
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      toast.success("Instructor deleted Successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);
  const handleDelete = async () => {
    setOpen(!open);
    const id = userId;
    await deleteUser(id);
  };
  return (
    <div className="min-h-screen bg-gray-200">
      <Heading
        title="Eduquest - Admin | Instructors"
        description="Platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
      />
      <div className="flex mx-auto z-[9999]">
        <div className="mx-auto pl-14 mt-20 w-[85%] ">
          <DashboardHero />
          {data && (
            <div
              className={`bg-white dark:bg-gray-800 relative shadow-md sm:rounded-sm overflow-hidden mx-28 p-4 mt-8`}
            >
              <BasicTable datas={data} columns={columns} type="category" />
            </div>
          )}
        </div>
        <Sidebar active={2} />
      </div>
      {open && (
        <CustomDeleteModal
          open={open}
          setOpen={setOpen}
          handleFunction={handleDelete}
          text="Are you sure you want to delete this instructor?"
        />
      )}
    </div>
  );
};

export default page;
