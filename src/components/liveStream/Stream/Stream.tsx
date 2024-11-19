import React, { useState, useEffect, useRef } from "react";
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
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0dyZWVkbyIsInVzZXJfaWQiOiJHcmVlZG8iLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTczMTk4NDg1MCwiZXhwIjoxNzMyNTg5NjUwfQ.Ah0MQGHHE_6CZ_XXWiOl6sDjuq2neY8FUqbhGVNMVk8";
const userId = "Greedo";

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
          await call.microphone.enable();
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
      {call && (
        <StreamCall call={call}>
          <MyLiveStreamUI callid={callid} onExit={onExit} />
        </StreamCall>
      )}
    </StreamVideo>
  );
};

export const MyLiveStreamUI = ({ callid, onExit }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const call = useCall();
  const { useIsCallLive, useLocalParticipant, useParticipantCount } =
    useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const handleStream = () => {
    if (user) {
      socketId.emit("startStream", { callid, instructorId: user._id });
    }
  };

  const toggleAudio = async () => {
    if (call) {
      try {
        if (isAudioEnabled) {
          console.log("Disabling microphone...");
          await call.microphone.disable();
        } else {
          console.log("Enabling microphone...");
          await call.microphone.enable();
        }
        setIsAudioEnabled(!isAudioEnabled);
      } catch (error) {
        console.error("Error toggling microphone:", error);
      }
    }
  };

  const toggleVideo = async () => {
    if (call) {
      if (isVideoEnabled) {
        await call.camera.disable();
      } else {
        await call.camera.enable();
      }
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex rounded bg-gray-100 px-4 py-2 text-black">Live</div>

      <div className="relative flex-1">
        {localParticipant && (
          <ParticipantView
            participant={localParticipant}
            ParticipantViewUI={null}
          />
        )}

        <div className="absolute bottom-4 left-4 flex space-x-4 justify-center">
          <button className={`${styles.button} p-2`} onClick={toggleAudio}>
            {isAudioEnabled ? (
              <FaMicrophone className="text-white" size={24} />
            ) : (
              <FaMicrophoneSlash className="text-red-500" size={24} />
            )}
          </button>

          <button className={`${styles.button} p-2`} onClick={toggleVideo}>
            {isVideoEnabled ? (
              <FaVideo className="text-white" size={24} />
            ) : (
              <FaVideoSlash className="text-red-500" size={24} />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          className={`${styles.button}`}
          onClick={() => {
            if (call) {
              if (!isCallLive) {
                handleStream();
                call
                  ?.join()
                  .catch((error) =>
                    console.error("Error joining call:", error)
                  );
                call
                  ?.goLive()
                  .catch((error) => console.error("Error going live:", error));
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
