"use client";
import React from "react";
import Stream from "../Stream/Stream";
import Chat from "../Chat/Chat";
import { useRouter } from "next/navigation";

type Props = {};

const Room = (props: Props) => {
  const callid = "pY4Bk55RLUhh";  
  const router = useRouter();

  const handleExit = () => {
    router.push("/instructor");
  };

  return (
    <main className="relative flex h-screen w-full bg-gray-900 text-white">
      <section className="flex flex-col h-full w-1/5 max-w-xs overflow-y-auto border-r border-gray-600 bg-gray-900">
        <div className="flex w-full items-center justify-between bg-gray-800 px-4 py-2 text-base">
          <p>Participants</p>
          <strong className="rounded bg-gray-700 px-4 py-1 text-sm font-semibold">
            27
          </strong>
        </div>
          
        <div className="flex flex-col gap-4 pt-4 px-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <p className="text-sm">Sulammita</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <p className="text-sm">Dennis Ivy</p>
          </div>
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center border-l border-gray-700 bg-gray-900 px-4 py-2">
        <Stream callid={callid} onExit={handleExit} />
      </section>

      <section className="w-1/4 max-w-xs overflow-y-auto border-l border-gray-700 bg-gray-900">
        <Chat callId={callid} isUser={false} />
      </section>
    </main>
  );
};

export default Room;
