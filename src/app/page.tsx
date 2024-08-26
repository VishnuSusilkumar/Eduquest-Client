"use client";
import React, { FC, useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Banner from "../components/Home/Banner";
import Categories from "@/components/Home/Categories";
interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        description="Eduquest is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Next,Microservice"
        title="Eduquest"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Banner setOpen={setOpen} />

      <Categories />
      
    </div>
  );
};

export default Page;
