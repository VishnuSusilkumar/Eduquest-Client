import React, { useEffect, useMemo } from "react";
import { useGetCourseAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import Loader from "../../ui/Loader/Loader";
import { styles } from "../../../styles/style";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import Link from "next/link";

type Props = {
  isDashboard?: boolean;
  onCourseCountChange?: (count: number) => void;
};

const CourseAnalytics = ({ isDashboard, onCourseCountChange }: Props) => {
  const { data, isLoading } = useGetCourseAnalyticsQuery("admin", {});
  const analyticsData = data && [...data].reverse();

  const totalCourseCount = useMemo(() => {
    return data
      ? data.reduce((sum: number, record: any) => sum + record.count, 0)
      : 0;
  }, [data]);

  useEffect(() => {
    if (onCourseCountChange) {
      onCourseCountChange(totalCourseCount);
    }
  }, [totalCourseCount, onCourseCountChange]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard ? "mt-[50px]" : "mt-[50px] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard && "!ml-8 mb-5"}`}>
            <div
              className={`${styles.title} ${
                isDashboard && "text-sm  px-5 !text-start"
              }`}
            >
              Course Analytics
            </div>
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            }  flex items-center justify-center`}
          >
            <ResponsiveContainer
              height={!isDashboard ? "50%" : "100%"}
              width={isDashboard ? "100%" : "90%"}
            >
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey={"month"} className="text-sm" />
                <YAxis className="text-sm" />
                <Bar dataKey="count" fill="#3faf82">
                  <LabelList
                    dataKey={"count"}
                    position={"top"}
                    className="text-sm"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
