"use client";
import Header from "../../components/Header";
import Protected from "../../hooks/useProtected";
import { FC, useState, useEffect } from "react";
import Profile from "../../components/Profile/Profile";
import Heading from "../../utils/Heading";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import Loader from "@/components/ui/Loader/Loader";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { isLoading, data, error } = useLoadUserQuery(undefined, {});
  
  useEffect(() => {
    if (error) {
      console.log("Error fetching user data", error);
    }
  }, [error]);

  return (
    <div>
      <Protected>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Heading
              title={`${data?.user?.name} profile`}
              description=""
              keywords=""
            />
            <Header
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              route={route}
            />
            <Profile user={data?.user} />
          </>
        )}
      </Protected>
    </div>
  );
};

export default Page;
