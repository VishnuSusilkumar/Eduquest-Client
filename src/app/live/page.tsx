"use client";

import { useSearchParams } from "next/navigation";
import RoomUser from "@/components/liveStream/Room/RoomUser";
import React, { useState, Suspense } from "react";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";

const PageContent = () => {
  const searchParams = useSearchParams();
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const streamId = searchParams.get("caller-id");
  console.log("Stream Id", streamId);

  return (
    <>
      <Heading title={` Live Session | Eduquest`} description="" keywords="" />
      <div className="mx-auto bg-gray-50 ">
        {streamId && <RoomUser streamId={streamId} />}
      </div>
    </>
  );
};

const Page = () => {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
};

export default Page;
