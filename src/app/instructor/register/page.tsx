"use client";

import Header from "../../../components/Header";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { styles, subjects, years } from "../../../styles/style";
import { FileRejection, useDropzone } from "react-dropzone";
import { HiArrowUpTray } from "react-icons/hi2";
import { TextGenerateEffect } from "../../../components/ui/TextGenerate";
import { RiCloseCircleFill, RiWindowsFill } from "react-icons/ri";
import * as Yup from "yup";
import { toast } from "sonner";
import { useInstructorRegisterMutation } from "../../../../redux/features/instructor/instructorApi";
import { useRouter } from "next/navigation";
import Protected from "../../../hooks/useProtected";
import SubLoader from "../../../components/ui/Loader/SubLoader";
import { useLoadUserQuery } from "../../../../redux/features/api/apiSlice"; 

const name = Yup.string()
  .max(30)
  .test(
    "no-leading-unusual-spaces",
    "should not have unusual spaces at the beginning",
    (value) => {
      if (typeof value === "string") {
        return !value.match(/^\s/);
      }
      return true;
    },
  )
  .required("Please enter your name");

const schema = Yup.object().shape({
  degree: name,
  institution: name,
  subject: name,
  certificateName: name,
  authority: name,
  yearOfCompletion: Yup.number()
    .typeError("Year must be a number")
    .integer("Year must be an integer")
    .min(1000, "Year must be at least 1000")
    .max(9999, "Year must be at most 9999")
    .required("Year is required"),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .nullable()
    .required("Date is required"),
});

type Props = {};

interface FileWithPreview extends File {
  preview: string;
}

const InstructorRegister: React.FC<Props> = (props) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);
  const formRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");
  const [register, { isSuccess, error, isLoading }] =
    useInstructorRegisterMutation();
  const { refetch } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful");
      refetch();
      router.push("/");
      
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      degree: "",
      institution: "",
      subject: "",
      yearOfCompletion: "",
      certificateName: "",
      authority: "",
      date: "",
    },
    validationSchema: schema,
    onSubmit: async ({
      degree,
      institution,
      subject,
      yearOfCompletion,
      certificateName,
      authority,
      date,
    }) => {
      const formData = new FormData();
      formData.append("certificate", files[0]);
      formData.append("degree", degree);
      formData.append("institution", institution);
      formData.append("subject", subject);
      formData.append("yearOfCompletion", yearOfCompletion);
      formData.append("certificateName", certificateName);
      formData.append("degree", authority);
      formData.append("date", date);
      if (!files[0]) {
        toast.error("Please upload certificate");
      } else {
        await register(formData);
      }
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]);
        setRejected([]);
      }
      if (rejectedFiles?.length) {
        setRejected(rejectedFiles);
      }
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      ".pdf, .docx": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
    onDrop,
  });

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div>
      <Protected>
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />

        <section className="bg-white font-Poppins dark:bg-gray-900">
          <div className="flex min-h-screen justify-center">
            <div
              className="hidden bg-cover lg:block lg:w-2/5"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
              }}
            ></div>

            <div className="mx-auto flex w-full max-w-3xl items-center p-8 lg:w-3/5 lg:px-12">
              <div className="w-full">
                <h1 className="font-Poppins text-2xl font-semibold uppercase tracking-wider text-gray-800 dark:text-white">
                  Become a Instructor
                </h1>

                <TextGenerateEffect
                  words="The way that you teach — what you bring to it — is up to you."
                  className="something"
                />
                <form className="mt-10" onSubmit={handleSubmit}>
                  <h1 className="mb-2 text-[18px] uppercase  text-gray-900">
                    Education Details:
                  </h1>
                  <div className="mb-3 ml-4 grid grid-cols-2 gap-2">
                    <div>
                      <label className={`${styles.label} text-sm uppercase`}>
                        Latest Degree
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={values.degree}
                        onChange={handleChange}
                        id="name"
                        placeholder="Degree"
                        className={`${
                          errors.degree && touched.degree && "border-red-500"
                        } ${styles.input} mt-0 text-sm`}
                      />
                      {errors.degree && touched.degree && (
                        <span className="block pt-1 text-sm text-red-500">
                          {errors.degree}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className={`${styles.label} text-sm uppercase`}>
                        Institution{" "}
                      </label>
                      <input
                        type="text"
                        name="institution"
                        value={values.institution}
                        onChange={handleChange}
                        placeholder="Institution"
                        className={`${
                          errors.institution &&
                          touched.institution &&
                          "border-red-500"
                        } ${styles.input} mt-0 text-sm`}
                      />
                      {errors.institution && touched.institution && (
                        <span className="block pt-1 text-sm text-red-500">
                          {errors.institution}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 ml-4 mt-6 grid grid-cols-2  gap-2">
                    <div>
                      <label className={`${styles.label} text-sm uppercase`}>
                        Major / Subject
                      </label>
                      <select
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        className={`${
                          errors.subject && touched.subject && "border-red-500"
                        } ${styles.input} mt-0 cursor-pointer text-sm text-black`}
                      >
                        <option value="">Select a Subject</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                      {errors.subject && touched.subject && (
                        <span className="block pt-1 text-sm text-red-500">
                          {errors.subject}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className={`${styles.label} text-sm uppercase`}>
                        Year of completion
                      </label>
                      <select
                        name="yearOfCompletion"
                        value={values.yearOfCompletion}
                        onChange={handleChange}
                        className={`${
                          errors.yearOfCompletion &&
                          touched.yearOfCompletion &&
                          "border-red-500"
                        } ${styles.input} mt-0 cursor-pointer text-sm text-black`}
                      >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      {errors.yearOfCompletion && touched.yearOfCompletion && (
                        <span className="block pt-1 text-sm text-red-500">
                          {errors.yearOfCompletion}
                        </span>
                      )}
                    </div>
                  </div>
                  <h1 className="mb-2  mt-6 pt-3 text-[18px] uppercase text-gray-900">
                    Certificate Details:
                  </h1>

                  <div className="mb-3 ml-4 grid grid-cols-2 gap-2">
                    <div>
                      <label className={`${styles.label} text-sm uppercase`}>
                        Certificate Name
                      </label>
                      <input
                        type="text"
                        name="certificateName"
                        value={values.certificateName}
                        onChange={handleChange}
                        placeholder="Certificate"
                        className={`${
                          errors.certificateName &&
                          touched.certificateName &&
                          "border-red-500"
                        } ${styles.input} mt-0 text-sm`}
                      />
                      {errors.certificateName && touched.certificateName && (
                        <span className="block pt-1 text-sm text-red-500">
                          {errors.certificateName}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className={`${styles.label} text-sm uppercase`}>
                        Issuing Authority
                      </label>
                      <input
                        type="text"
                        name="authority"
                        value={values.authority}
                        onChange={handleChange}
                        placeholder="Authority"
                        className={`${
                          errors.authority &&
                          touched.authority &&
                          "border-red-500"
                        } ${styles.input} mt-0 text-sm`}
                      />
                      {errors.authority && touched.authority && (
                        <span className="block pt-1 text-sm text-red-500">
                          {errors.authority}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="ml-4">
                    <label className={`${styles.label} text-sm uppercase`}>
                      Date of Certification
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      className={`${
                        errors.date && touched.date && "border-red-500"
                      } ${styles.input} mt-0 text-sm`}
                    />
                    {errors.date && touched.date && (
                      <span className="block pt-1 text-sm text-red-500">
                        {errors.date}
                      </span>
                    )}
                  </div>
                  <button type="submit" hidden ref={formRef}>
                    submit
                  </button>
                </form>
                <form>
                  <div
                    {...getRootProps({
                      className: "drop",
                    })}
                    className="ml-4 mt-6 cursor-pointer border border-dashed border-gray-400 p-4"
                  >
                    <input {...getInputProps({ name: "file" })} required />
                    <div className="flex flex-col items-center justify-center gap-4 text-sm">
                      <HiArrowUpTray className="h-5 w-5 fill-current" />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          Drag & drop file here, or click to select file ( .pdf
                          )
                        </p>
                      )}
                    </div>
                  </div>
                </form>
                {files[0] && (
                  <div className="ml-4 mt-2 flex items-center justify-between border-2 p-1 text-sm">
                    <span>{files[0].name}</span>
                    <RiCloseCircleFill
                      onClick={removeAll}
                      className="cursor-pointer"
                    />
                  </div>
                )}
                {rejected.map(({ file, errors }) => (
                  <li
                    key={file.name}
                    className="ml-4 flex items-start justify-between"
                  >
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </li>
                ))}
                <div className="ml-4 mt-8">
                  <button
                    className={`${styles.button} min-h-[2.7rem]  bg-gray-900 !font-thin tracking-wider text-white dark:bg-gray-800 `}
                    onClick={() => formRef.current?.click()}
                  >
                    {isLoading ? (
                      <span>
                        {" "}
                        <SubLoader />
                      </span>
                    ) : (
                      <>Submit </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Protected>
    </div>
  );
};

export default InstructorRegister;
