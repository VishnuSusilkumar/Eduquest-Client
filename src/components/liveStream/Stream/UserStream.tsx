import React, { useEffect } from "react";
import {
  LivestreamLayout,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1NhdmFnZV9PcHJlc3MiLCJ1c2VyX2lkIjoiU2F2YWdlX09wcmVzcyIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzMzNDczMzI1LCJleHAiOjE3MzQwNzgxMjV9.iDsNGU4qkb7hJW3kfUe0wD1r5GsyijN8AIIEPppOVns";
const userId = "Savage_Opress";

const client = new StreamVideoClient({
  apiKey,
  token,
  user: { id: userId },
});

type Props = {
  callid: string;
};

const UserStream = ({ callid }: Props) => {
  const call = client.call("livestream", callid);

  useEffect(() => {
    const joinCall = async () => {
      try {
        await call.join();
      } catch (error) {
        console.error("Error joining call:", error);
      }
    };

    joinCall();

    return () => {
      call.leave().catch((error) => {
        console.error("Error leaving call:", error);
      });
    };
  }, [callid, call]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamLayout showParticipantCount={false} />
      </StreamCall>
    </StreamVideo>
  );
};

export default UserStream;
