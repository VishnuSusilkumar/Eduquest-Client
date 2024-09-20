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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0RhcnRoX0tyYXl0IiwidXNlcl9pZCI6IkRhcnRoX0tyYXl0IiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MjY4MTU2NjUsImV4cCI6MTcyNzQyMDQ2NX0.Gnk_AtkCH4XdJprbbwvj4ohQM2WoACQBmeoz14zTpPM";
const userId = "Darth_Krayt";

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
    <div className="flex flex-col gap-2 p-4">
      <div className="flex rounded bg-gray-100 px-4 py-2 text-black">
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
      <div className="flex items-center justify-center">
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
