import { useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import { SignlRContext } from "./SignalRContext";

export function SignalRProvider({ children }) {
  const chat = useChat();

  const { connection } = chat;

  useEffect(() => {
    chat.Reconnect();
  }, []);

  if (!connection || connection._connectionState == "Disconnected")
    return <>Disconnected</>;
  if (connection._connectionState == "Connecting") return <>Loading...</>;
  return (
    <SignlRContext.Provider value={chat}>{children}</SignlRContext.Provider>
  );
}
