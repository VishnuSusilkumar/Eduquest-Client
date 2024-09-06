import React, { useEffect, useRef } from "react";
import {
  ParticipantView,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  type User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { styles } from "../../../styles/style";
import { socketId } from "../../../utils/socket";
import { useSelector } from "react-redux";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTWFyYV9KYWRlIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9NYXJhX0phZGUiLCJpYXQiOjE3MjUyNTYzMzksImV4cCI6MTcyNTg2MTE0NH0.tgnieFqYetqmZ1e19UFa9HxCljCVjkXQAA1PvhNvGXs";
const userId = "Mara_Jade";

const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });

type Props = {
  callid: string;
  onExit: () => void;
};

const Stream = ({ callid, onExit }: Props) => {
  const call = client.call("livestream", callid);
  const hasJoined = useRef(false);

  useEffect(() => {
    const joinCall = async () => {
      if (!hasJoined.current) {
        try {
          await call.join({ create: true });
          hasJoined.current = true;
        } catch (error) {
          console.error("Error joining call:", error);
        }
      }
    };

    joinCall();

    return () => {
      if (hasJoined.current) {
        call.endCall().catch((error) => {
          console.error("Error ending call:", error);
        });
        hasJoined.current = false;
      }
    };
  }, [callid, call]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyLiveStreamUI callid={callid} onExit={onExit} />
      </StreamCall>
    </StreamVideo>
  );
};

export const MyLiveStreamUI = ({ callid, onExit }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const call = useCall();
  const { useIsCallLive, useLocalParticipant, useParticipantCount } =
    useCallStateHooks();
  const totalParticipant = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();

  const handleStream = () => {
    if (user) {
      socketId.emit("startStream", { callid, instructorId: user._id });
    }
  };

  return (
    <div className="flex flex-col gap-[5px] ">
      <div className="flex rounded-[8px] px-4 py-6 align-baseline text-white">
        Live
      </div>
      <div className="">
        <div className="flex-1">
          {localParticipant && (
            <ParticipantView
              participant={localParticipant}
              ParticipantViewUI={null}
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center align-middle">
        <button
          className={`${styles.button}`}
          onClick={() => {
            if (!isCallLive) {
              handleStream();
              call?.join().catch((error) => {
                console.error("Error joining call:", error);
              });
              call?.goLive().catch((error) => {
                console.error("Error going live:", error);
              });
            } else {
              // Emit endStream event
              socketId.emit("endStream", { callid });
              call
                ?.endCall()
                .then(() => {
                  onExit();
                })
                .catch((error) => {
                  console.error("Error ending call:", error);
                });
            }
          }}
        >
          {isCallLive ? "Stop Livestream" : "Start Livestream"}
        </button>
      </div>
    </div>
  );
};

export default Stream;
