"use client";
import React from "react";
import Stream from "../Stream/Stream";
import Chat from "../Chat/Chat";
import Participants from "../Participants/Participants"; 
import { useRouter } from "next/navigation";

type Props = {};

const Room = (props: Props) => {
  const callid = "pY4Bk55RLUhh";  
  const router = useRouter();

  const handleExit = () => {
    router.push("/instructor");
  };

  return (
    <main className="relative flex h-screen w-full bg-white text-black">
      <Participants callId={callid} /> 

      <section className="flex-1 flex items-center justify-center border-l border-gray-300 bg-white px-4 py-2">
        <Stream callid={callid} onExit={handleExit} />
      </section>

      <section className="w-1/4 max-w-xs overflow-y-auto border-l border-gray-300 bg-white">
        <Chat callId={callid} isUser={false} />
      </section>
    </main>
  );
};

export default Room;
