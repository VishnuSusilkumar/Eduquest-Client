import { socketId } from "../../../utils/socket";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  callId: string;
  isUser?: boolean;
};

const Chat = ({ callId }: Props) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<any[]>([]);
  const { user } = useSelector((state: any) => state.auth);
  const [msg, setMsg] = useState("");

  const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (msg.length) {
      const timestamp = getCurrentTime();
      socketId.emit("sendMessage", {
        callId,
        content: { name: user.name, message: msg, time: timestamp },
      });
      setChats((prev: any) => [
        ...prev,
        { name: user.name, message: msg, time: timestamp, self: true },
      ]);
    }
    setMsg("");
  };

  const handleReceiveMessage = (data: any) => {
    console.log("Received", data);

    if (data.callId === callId && data.content.name !== user.name) {
      setChats((prev: any) => [...prev, { ...data.content, self: false }]);
    }
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 30);
    }
  };

  useEffect(() => {
    socketId.on("recieveMessage", handleReceiveMessage);

    return () => {
      socketId.off("recieveMessage", handleReceiveMessage);
    };
  }, [callId]);

  return (
    <section
      className="absolute right-0 top-0 w-full max-w-xs overflow-y-auto border-l border-gray-300 bg-white text-sm pb-20"
      style={{ height: "calc(100vh - 80px)" }}
      ref={chatContainerRef}
    >
      <div className="w-full overflow-y-auto">
        {chats.map((item, index) => (
          <div
            key={index}
            className={`m-4 flex ${
              item.self ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-lg p-2 ${
                item.self
                  ? "bg-blue-100 text-black"
                  : "bg-gray-200 text-green-700"
              }`}
            >
              <strong className="mr-2 font-[600]">{item.name}</strong>
              <p className="m-0">{item.message}</p>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      <form
        className="fixed bottom-0 w-full bg-white p-4 border-t border-gray-300"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          name="message"
          placeholder="Send a message...."
          className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-black"
        />
      </form>
    </section>
  );
};

export default Chat;
