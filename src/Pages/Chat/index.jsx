import { useEffect, useRef, useState } from "react";
import { useChat } from "../../hooks/useChat";
import { RoomSelector } from "./components/RoomSelector";
import { ChatRoom } from "./components/ChatRoom";
import jwtDecode from "jwt-decode";
import { getAccessToken } from "../../utils/get-access-token";
import { ChatWindow } from "./index.style";
import { useNavigate } from "react-router-dom";

export function Chat() {
  const { connection } = useChat();
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const router = useNavigate();
  const accesstoken = getAccessToken();

  async function getRooms() {
    try {
      if (connection && connection?._connectionState == "Connected") {
        connection.on("RecivieAllRooms", (data) => {
          setRooms(data);
        });

        var jwtToken = jwtDecode(accesstoken);
        var userId = jwtToken["Sid"];

        connection.invoke("GetAllRooms", userId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!accesstoken) {
      router("/signup");
      return;
    }
    getRooms();
  }, [connection]);
  
  if(!accesstoken) {
    return null;
  }

  return (
    <ChatWindow>
      <ChatRoom SelectedRoom={selectedRoom} />
      <RoomSelector
        rooms={rooms}
        setSelectedRoom={setSelectedRoom}
        setRooms={setRooms}
      />
    </ChatWindow>
  );
}
