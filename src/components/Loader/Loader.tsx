"use client";
import React from "react";
import { BeatLoader } from "react-spinners";

type Props = {};

const Loader = (props: Props) => {
  return (
    <BeatLoader
      color="#000000"
      className="h-screen justify-center w-full items-center"
    />
  );
};

export default Loader;
