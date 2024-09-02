import sockerIO from "socket.io-client";
const EndPoint = "http://localhost:8000" || "";
export const socketId = sockerIO(EndPoint, {
  transports: ["websocket"],
  path: "/socket.io",
});


