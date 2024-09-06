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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTWFyYV9KYWRlIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9NYXJhX0phZGUiLCJpYXQiOjE3MjUyNTYzMzksImV4cCI6MTcyNTg2MTE0NH0.tgnieFqYetqmZ1e19UFa9HxCljCVjkXQAA1PvhNvGXs";
const userId = "Mara_Jade";

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
