"use client";
import React, { useEffect } from "react";
import UserStream from "../Stream/UserStream";
import Chat from "../Chat/Chat";
import { socketId } from "../../../utils/socket";
import { useRouter } from "next/navigation";
import { FaPhoneSlash } from "react-icons/fa";

type Props = {
  streamId: string;
};

const RoomUser = ({ streamId }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const handleStreamEnd = () => {
      localStorage.removeItem("activeStreamId");
      router.push("/");
    };

    socketId.on("streamEnded", (data) => {
      if (data.streamId === streamId) {
        handleStreamEnd();
      }
    });

    return () => {
      socketId.off("streamEnded");
    };
  }, [streamId, router]);

  const handleExit = () => {
    router.push("/");
  };

  return (
    <main className="relative h-screen w-screen bg-gray-900 text-white">
      <section className="fixed left-0 top-0 h-full w-1/4 max-w-xs overflow-y-auto border-r border-gray-600 bg-gray-900">
        <div className="flex w-full items-center justify-around bg-gray-800 px-4 py-2 text-base">
          <p>Participants</p>
          <strong className="rounded bg-gray-800 px-4 py-2 text-sm font-semibold">
            10
          </strong>
        </div>

        <div className="pt-16 pb-4 flex flex-col gap-4">
          <div className="flex items-center gap-4 pl-4">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <p className="text-sm">Sulammita</p>
          </div>
          <div className="flex items-center gap-4 pl-4">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <p className="text-sm">Dennis Ivy</p>
          </div>
        </div>
      </section>

      <section className="fixed right-0 top-0 h-full w-1/4 max-w-xs overflow-y-auto border-l border-gray-700 bg-gray-900">
        <Chat callId={streamId} isUser={true} />
      </section>

      <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/4 h-3/4 bg-gray-800 border border-gray-600">
        <UserStream callid={streamId} />
      </section>

      <section className="absolute left-1/2 top-[calc(50%+10rem)] transform -translate-x-1/2">
        <button
          onClick={handleExit}
          className="p-2 text-white bg-red-500 rounded shadow-md hover:bg-red-600"
        >
          <FaPhoneSlash size={20} />
        </button>
      </section>
    </main>
  );
};

export default RoomUser;
