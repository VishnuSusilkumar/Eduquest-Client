import React, { useState } from "react";
import { useReportCourseMutation } from "../../../redux/features/user/userApi";
import { toast } from "sonner";

type ReportCourseModalProps = {
  course: any;
  isOpen: boolean;
  onClose: () => void;
};

const ReportCourseModal = ({
  course,
  isOpen,
  onClose,
}: ReportCourseModalProps) => {
  const [reportReason, setReportReason] = useState("");

  const [reportCourse, { isLoading, isError, isSuccess }] =
    useReportCourseMutation();

  const handleSubmit = async () => {
    if (!reportReason.trim()) {
      alert("Please provide a valid reason for reporting.");
      return;
    }

    try {
      await reportCourse({
        courseId: course._id,
        courseName: course.name,
        reason: reportReason,
      }).unwrap();

      console.log("Course reported successfully");
      toast.success(
        "The course has been successfully reported. We will review the report and take appropriate action."
      );
      onClose();
    } catch (error) {
      console.error("Failed to report the course", error);
      alert("There was an error reporting the course.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-3">Report Course</h2>
        <p className="mb-4 text-sm">
          Please provide a reason for reporting the course:{" "}
          <strong>{course.name}</strong>
        </p>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          placeholder="Enter reason..."
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded-md text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-md text-sm"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCourseModal;
