"use client";
import React, { FC, useState } from "react";
import Header from "../components/Header";
import Carousell from "../components/Carousel/Carousel";
import Heading from "../utils/Heading";
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
      {/* <Carousell /> */}
    </div>
  );
};

export default Page;
