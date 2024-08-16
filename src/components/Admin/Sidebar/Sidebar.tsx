"use client";
import React, { useContext } from "react";
import SidebarControl, { SidebarContext } from "../../Sidebar/SidebarControl";
import { SidebarItem } from "../../Sidebar/SidebarItems";
import {
  AcademicCapIcon,
  HomeIcon,
  TvIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

type Props = {
  active: number;
};

const Sidebar: React.FC<Props> = ({ active }) => {
  return (
    <>
      <SidebarControl>
        <SidebarItem
          icon={<TvIcon className="w-6" />}
          text={"Dashboard"}
          routerPath="/admin"
          active={active === 0 ? true : false}
        />
        <SidebarItem
          icon={<UserGroupIcon className="w-6" />}
          text={"Users"}
          routerPath="/admin/users"
          active={active === 1 ? true : false}
        />
        <SidebarItem
          icon={<AcademicCapIcon className="w-6" />}
          text={"Instructors"}
          routerPath="/admin/instructors"
          active={active === 2 ? true : false}
        />

        <SidebarItem
          icon={<HomeIcon className="w-6" />}
          text={"Home"}
          routerPath="/"
          active={active === 3 ? true : false}
        />
      </SidebarControl>
    </>
  );
};

export default Sidebar;
