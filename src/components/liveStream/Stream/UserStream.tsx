import React from "react";
import {
  LivestreamLayout,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  type User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

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
  callerid: string;
};

const UserStream = ({ callerid }: Props) => {
  const call = client.call("livestream", callerid);

  call.camera.disable();
  call.microphone.disable();

  call.join({ create: true });

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamLayout showParticipantCount={false} />
      </StreamCall>
    </StreamVideo>
  );
};

export default UserStream;
