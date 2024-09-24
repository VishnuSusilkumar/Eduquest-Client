import React, { createContext, useContext, useReducer, ReactNode } from "react";

type StreamState = {
  streamId: string | null;
};

type StreamAction =
  | { type: "SET_STREAM_ID"; payload: string }
  | { type: "END_STREAM" };

const initialState: StreamState = {
  streamId: null,
};

const streamReducer = (
  state: StreamState,
  action: StreamAction
): StreamState => {
  switch (action.type) {
    case "SET_STREAM_ID":
      return { ...state, streamId: action.payload };
    case "END_STREAM":
      return { ...state, streamId: null };
    default:
      return state;
  }
};

const StreamContext = createContext<{
  state: StreamState;
  dispatch: React.Dispatch<StreamAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const StreamProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(streamReducer, initialState);

  return (
    <StreamContext.Provider value={{ state, dispatch }}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = () => {
  return useContext(StreamContext);
};
