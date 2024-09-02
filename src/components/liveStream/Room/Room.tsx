"use client";
import React from "react";
import Stream from "../Stream/Stream";
import { v4 as uuidv4 } from "uuid";
import Chat from "../Chat/Chat";

type Props = {};

const Room = (props: Props) => {
  const callid = "pY4Bk68RLUBi";
  return (
    <main className="  relative ml-10 w-full bg-gray-900 text-white">
      <div className="relative flex gap-12">
        <section className="fixed z-50 h-full w-11/12 max-w-56 overflow-y-auto border-r border-gray-600 bg-gray-900">
          <div className="fixed flex w-56 items-center justify-around bg-gray-800 px-4 text-base">
            <p>Participants</p>
            <strong className="rounded bg-gray-800 px-4 py-2 text-sm font-semibold">
              27
            </strong>
          </div>

          <div className="pb-26 flex flex-col gap-4 pt-20">
            <div className="flex items-center gap-4 pl-4">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <p className="text-sm">Sulammita</p>
            </div>

            <div className="flex items-center gap-4 pl-4">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <p className="text-sm ">Dennis Ivy</p>
            </div>
          </div>
        </section>

        <section className="bottom-0   left-1/2 flex !h-screen !w-full max-w-[55%] -translate-x-1/2 transform items-center justify-center border-l border-gray-700 bg-gray-900 px-4 py-2 text-white sm:relative sm:h-auto sm:w-full sm:border-l-0 sm:border-t sm:border-gray-700 ">
          <Stream callid={callid} />
        </section>

        <Chat callId={callid} isUser={false} />
      </div>
    </main>
  );
};

export default Room;
