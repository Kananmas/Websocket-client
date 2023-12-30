import { memo, useEffect, useState } from "react";
import { useChat } from "../../hooks/chat.hook";
import { RoomSelector } from "./components/RoomSelector";
import { ChatRoom } from "./components/ChatRoom";
import jwtDecode from "jwt-decode";
import { getAccessToken } from "../../utils/get-access-token.utils";
import { ChatWindow } from "./index.style";
import { useNavigate } from "react-router-dom";

function ChatComponent() {
  const { connection,Reconnect } = useChat();
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [timePassed, setTimePassed] = useState(false);
  const [rooms, setRooms] = useState([]);
  const router = useNavigate();
  const accesstoken = getAccessToken();

  async function getRooms() {
    try {
      if(!connection) {
        await Reconnect();
      }
      if (connection && connection?._connectionState === "Connected") {
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
    // this is a evil trick to react so it invoke 
    // "GetAllRooms" Request to backend
    const timeOutValue = setTimeout(() => {
      setTimePassed(true);
      return timePassed;
    }, 1000);

    if (timePassed) {
      clearTimeout(timeOutValue);
    }
    getRooms();
  }, [connection, timePassed , selectedRoom]);


  if (!accesstoken) {
    return null;
  }

  return (
    <ChatWindow>
      <ChatRoom SelectedRoom={selectedRoom} />
      <RoomSelector
        rooms={rooms}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        setRooms={setRooms}
      />
    </ChatWindow>
  );
}

export const Chat = memo(ChatComponent);
