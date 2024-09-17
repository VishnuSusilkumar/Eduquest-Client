import React, { useState } from "react";
import UserAnalyticsInstructor from "../Analytics/UserAnalyticsInstructor";
import OrderAnalyticsInstructor from "../Analytics/OrderAnalyticsInstructor";
import { ScaleIcon, UsersIcon } from "@heroicons/react/24/outline";

type Props = {
  open: boolean;
};

const InstructorDashboardWidgets = (props: Props) => {
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  return (
    <div>
      <div className="grid-cols-2 flex justify-between">
        <div className="w-[70%]">
          <UserAnalyticsInstructor
            isDashboard={true}
            onUserCountChange={setTotalUserCount}
          />
        </div>
        <div className="justify-center items-center flex ">
          <div className=" ">
            <div className="bg-white relative  flex-col flex border border-t-[#4d62d9] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm ">
              <span className="font-bold text-2xl tracking-widest pb-2 text-black">
                {totalUserCount}
              </span>
              <span className="font-semibold text-sm text-gray-500">Users</span>
              <UsersIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
            </div>
            <div className="bg-white relative flex-col flex border border-t-[#4d62d9] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm">
              <span className="font-bold text-2xl tracking-widest pb-2 text-black">
                {totalOrderCount}
              </span>
              <span className="font-semibold text-sm text-gray-500">
                Sales Obtained
              </span>
              <ScaleIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="w-[70%]">
        <div>
          <OrderAnalyticsInstructor
            isDashboard={true}
            onOrderCountChange={setTotalOrderCount}
          />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardWidgets;
