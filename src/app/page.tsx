"use client";
import React, { FC, useState, useEffect } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Banner from "../components/Home/Banner";
import Categories from "@/components/Home/Categories";
import FAQ from "@/components/Home/FAQ";
import AboutUs from "@/components/Home/AboutUs";
import { Footer } from "@/components/Home/Footer";
interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#aboutus") {
      const aboutUsSection = document.getElementById("aboutus-section");
      if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

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
      <div id="aboutus-section">
        <AboutUs />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
