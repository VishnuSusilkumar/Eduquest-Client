"use client";
import React, { useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { RiVideoAddFill } from "react-icons/ri";
import { styles } from "@/styles/style";
import { Check } from "lucide-react";
import { toast } from "sonner";

type Props = {
  fetchData: any;
};

const FileUpload: React.FC<Props> = ({ fetchData }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<
    "select" | "uploading" | "done"
  >("select");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const MAX_FILE_SIZE_MB = 500;
      const MAX_VIDEO_LENGTH_MINUTES = 30;

      if (file.type !== "video/mp4") {
        toast.warning("Please select an MP4 video file.");
        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.warning(
          `Selected file exceeds the maximum size limit of ${MAX_FILE_SIZE_MB}MB.`
        );
        return;
      }

      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        if (video.duration > MAX_VIDEO_LENGTH_MINUTES * 60) {
          toast.warning(
            `Selected video exceeds the maximum duration limit of ${MAX_VIDEO_LENGTH_MINUTES} minutes.`
          );
        } else {
          return;
        }
      };
      setSelectedFile(event.target.files && event.target.files[0]);
    }
  };

  const clearFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:8001/api/transcode",
        formData,
        {
          onUploadProgress: (progressEvent: any) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
          withCredentials: true,
        }
      );
      fetchData();
      setUploadStatus("done");
    } catch (error: unknown) {
      setUploadStatus("select");
    }
  };

  return (
    <div className="">
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="videoinput"
        accept=".mp4"
      />

      {!selectedFile && (
        <label
          className="flex  cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-600 bg-white  py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
          tabIndex={0}
          htmlFor="videoinput"
        >
          <span className="flex items-center space-x-2">
            <svg className="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
              <path
                d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></path>
              <path
                d="M80,128a80,80,0,1,1,144,48"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></path>
              <polyline
                points="118.1 161.9 152 128 185.9 161.9"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></polyline>
              <line
                x1="152"
                y1="208"
                x2="152"
                y2="128"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
            </svg>
            <span className="text-sm font-medium text-gray-600 ">
              Drop files to Attach, or
              <span className="text-blue-600 underline">&nbsp; browse</span>
              &nbsp;( MP4 format, up to 500MB, max 30 minutes )
            </span>
          </span>
        </label>
      )}

      {selectedFile && (
        <>
          <div className=" border border-gray-300 rounded-md p-4 items-center relative flex">
            <span className="material-symbols-outlined icon text-gray-900">
              <RiVideoAddFill size={30} />
            </span>

            <div className="ml-4 flex-1 800px:px-5 mr-10 overflow-auto">
              <div>
                <h6 className="text-sm font-medium">{selectedFile?.name}</h6>

                <div className="progress-bg w-full h-1 bg-gray-200 rounded-lg mt-2">
                  <div
                    className="progress h-full bg-gray-600 rounded-lg"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {uploadStatus === "select" ? (
              <button
                className="absolute m-2 bg-gray-100 border border-gray-300 rounded-full p-2 right-1 hover:bg-gray-400"
                onClick={clearFileInput}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <div className="check-circle w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full  text-xs">
                {uploadStatus === "uploading" ? (
                  `${progress}%`
                ) : uploadStatus === "done" ? (
                  <span className="material-symbols-outlined text-gray-100 text-lg">
                    <Check />
                  </span>
                ) : null}
              </div>
            )}
          </div>

          <button
            className={`${styles.button}  !py-2 !px-2  my-2 !w-28 text-xs text-white !font-[100] float-end !min-h-[30px]`}
            onClick={handleUpload}
          >
            {uploadStatus === "select" || uploadStatus === "uploading"
              ? "Upload"
              : "Done"}
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
