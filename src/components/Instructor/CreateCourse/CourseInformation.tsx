import { styles } from "../../../styles/style";
import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../../../redux/features/admin/adminApi";
import axios from "axios";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
};

const CourseInformation: React.FC<Props> = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) => {
  const [dragging, setDragging] = useState(false);
  const [videoOptions, setVideoOptions] = useState<any[]>([]);
  const { data: categories } = useGetCategoriesQuery(undefined, {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://app.eduquestelearn.site/api/transcode/getData`,
          { withCredentials: true }
        );
        const uploadedVideos = response.data.filter(
          (item: any) => item.status === "Uploaded"
        );
        setVideoOptions(uploadedVideos);
      } catch (e: any) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    courseInfo.thumbnailFile = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventEventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventEventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventEventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className=" m-auto mt-12">
      <p className="text-gray-600 text-center mb-4">
        Before creating a course, please complete video uploads in the Upload
        Media section.
      </p>
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Learn MERN stack"
            className={`${styles.input} `}
          />
        </div>
        <br />
        <div className="mb-3">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Description.."
            className={`${styles.input} !h-min py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <br />
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label htmlFor="">Course Price</label>
              <input
                type="number"
                name=""
                required
                value={courseInfo.price}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, price: e.target.value })
                }
                id="price"
                placeholder="3999"
                className={`${styles.input} `}
              />
            </div>
            <div className="w-[45%]">
              <label htmlFor="">Estimated Price</label>
              <input
                type="number"
                name=""
                required
                value={courseInfo.estimatedPrice}
                onChange={(e: any) =>
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: e.target.value,
                  })
                }
                id="estimatedPrice"
                placeholder="4999"
                className={`${styles.input} `}
              />
            </div>
          </div>
          <br />
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label className={`${styles.label}`} htmlFor="email">
                Course Tags{" "}
              </label>
              <input
                type="text"
                required
                name=""
                value={courseInfo.tags}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, tags: e.target.value })
                }
                id="tags"
                placeholder="MERN, Next 13, Socket io, tailwind css, LMS"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[45%]">
              <label htmlFor="subtitleUrl">Subtitle URL</label>
              <select
                name="subtitleUrl"
                required
                value={courseInfo.subtitleUrl}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, subtitleUrl: e.target.value })
                }
                id="subtitleUrl"
                className={`${styles.input}`}
              >
                <option value="">Select Subtitle URL</option>
                {videoOptions.map((option) => (
                  <option value={option.subtitleUrl} key={option._id}>
                    {option.fileName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="level">Course Level</label>
            <select
              name="level"
              required
              value={courseInfo.level}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              className={`${styles.input} `}
            >
              <option value="">Select Course Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="w-[45%]">
            <label htmlFor="demoUrl">Demo URL</label>
            <select
              name="demoUrl"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              className={`${styles.input}`}
            >
              <option value="">Select Demo URL</option>
              {videoOptions.map((option) => (
                <option value={option.videoUrl} key={option._id}>
                  {option.fileName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full mt-4">
          <label htmlFor="level">Category</label>
          <select
            name="level"
            required
            value={courseInfo.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCourseInfo({ ...courseInfo, category: e.target.value })
            }
            id="level"
            className={`${styles.input} `}
          >
            <option value="">Select Category</option>
            {categories &&
              categories.map((item: any, index: number) => (
                <option value={item.category} key={index}>
                  {item.category}
                </option>
              ))}
          </select>
        </div>
        <br />

        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`cursor-pointer w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border-dashed border-2 rounded-sm flex items-center justify-center ${
              dragging ? "Obg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="object-cover"
                width={700}
                height={400}
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse.{" "}
                <span className="text-sm">
                  ( The file size should be less than 2MB )
                </span>
              </span>
            )}
          </label>
        </div>

        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-gradient-to-tr from-indigo-200 to-indigo-400 text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
