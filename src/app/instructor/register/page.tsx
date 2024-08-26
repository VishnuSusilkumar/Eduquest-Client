"use client";
import Header from "@/components/Header";
import Protected from "@/hooks/useProtected";
import { FC, useState } from "react";
import InstructorRegister from "@/components/Instructor/Register/Register";
import Heading from "../../../utils/Heading";
import { useSelector } from "react-redux";

type Props = {};

const page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading title={`${user?.name} Become an Instructor`} description="" keywords="" />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <InstructorRegister />
      </Protected>
    </div>
  );
};

export default page;
