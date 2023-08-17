import { useContext } from "react";
import { SignlRContext } from "../Context/SignalR/SignalRContext";

export function useChat() {
  const SignalR = useContext(SignlRContext);

  return SignalR;
}
