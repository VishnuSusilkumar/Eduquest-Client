import sockerIO from "socket.io-client";
const EndPoint = "https://app.eduquestelearn.site" || "";
export const socketId = sockerIO(EndPoint, {
  transports: ["websocket"],
  path: "/socket.io",
});


