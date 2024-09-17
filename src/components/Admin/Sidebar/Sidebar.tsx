"use client";
import React from "react";
import SidebarControl from "../../Sidebar/SidebarControl";
import { SidebarItem } from "../../Sidebar/SidebarItems";
import {
  AcademicCapIcon,
  HomeIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  TvIcon,
  UserGroupIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { AdminSidebar } from "@/constants/enums";

type Props = {
  active: number;
};

const Sidebar: React.FC<Props> = ({ active }) => {
  return (
    <div className="!z-[99]">
      <SidebarControl>
        <SidebarItem
          icon={<TvIcon className="w-6" />}
          text={"Dashboard"}
          routerPath="/admin"
          active={active === AdminSidebar.dashboard ? true : false}
        />
        <SidebarItem
          icon={<UserGroupIcon className="w-6" />}
          text={"Users"}
          routerPath="/admin/users"
          active={active === AdminSidebar.users ? true : false}
        />
        <SidebarItem
          icon={<AcademicCapIcon className="w-6" />}
          text={"Instructors"}
          routerPath="/admin/instructors"
          active={active === AdminSidebar.instructors ? true : false}
        />
        <SidebarItem
          icon={<BookOpenIcon className="w-6" />}
          text={"Courses"}
          routerPath="/admin/courses"
          active={active === AdminSidebar.courses ? true : false}
        />

        <SidebarItem
          icon={<PencilSquareIcon className="w-6" />}
          text={"FAQ"}
          routerPath="/admin/faq"
          active={active === AdminSidebar.faq ? true : false}
        />

        <SidebarItem
          icon={<Squares2X2Icon className="w-6" />}
          text={"Categories"}
          routerPath="/admin/categories"
          active={active === AdminSidebar.categories ? true : false}
        />

        <SidebarItem
          icon={<HomeIcon className="w-6" />}
          text={"Home"}
          routerPath="/"
          active={active === 6 ? true : false}
        />
      </SidebarControl>
    </div>
  );
};

export default Sidebar;
