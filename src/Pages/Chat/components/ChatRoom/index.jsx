// components
import { Button, Input } from "antd";
import { Message } from "./components/Message";
import { RoomHolder, RoomInputHolder, RoomMessageHolder, TitleStyle } from "./index.style";
import { SendOutlined } from "@ant-design/icons";

// utils
import { randomString } from "../../../../utils/random-string.utils";

// hooks
import { useException } from "../../../../hooks/exception.hook";
import { useEffect , useState } from "react";
import { useChat } from "../../../../hooks/chat.hook";


export function ChatRoom({ SelectedRoom }) {
  const { connection } = useChat();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const {setter} = useException();

  const updateMessages = (data) => {
    try {
      setMessages([]);
      if(!SelectedRoom || !data.length) return;
      var roomId = data[0]?.roomId
      if(roomId == SelectedRoom.id)
        setMessages(data);
    }
    catch (e) {
      setter(e);
    }
  };
  const getChatMessages =async () => {
    try {
      if (connection && connection._connectionState == "Connected") {
        connection.on("RecivieChatMessages", updateMessages);

        connection.invoke("GetChatMessagesForMe", SelectedRoom.id);
      }
    } catch (e) {
      setter(e);
    }
  };

  const sendMessages = async () => {
    try {
        if (connection && connection._connectionState == "Connected") {
          connection.on("RecivieChatMessages", updateMessages);
          connection.invoke("SendNewMessage", messageText, SelectedRoom.id);
        }
    } catch (e) {
      setter(e);
    }
  };

  const handleOnChangeMessageText = (e) => {
    setMessageText(e.target.value);
  };

  const handleOnClickSend = () => {
    sendMessages();
    setMessageText("")
  };

  useEffect(() => {
    if (SelectedRoom) {
      getChatMessages();
    }
  }, [SelectedRoom]);

  if (!SelectedRoom) {
    return (
      <RoomHolder>
        <h5>No Room Selected</h5>
      </RoomHolder>
    );
  }

  return (
    <RoomHolder>
      <TitleStyle level={3}>{SelectedRoom.name}</TitleStyle>
      <RoomMessageHolder>
        {messages.map((message) => (
          <Message
            key={randomString()}
            Message={message}
            roomId={SelectedRoom.id}
          />
        ))}
      </RoomMessageHolder>

      <RoomInputHolder>
        <Input value={messageText} onChange={handleOnChangeMessageText} />
        <Button onClick={handleOnClickSend}><SendOutlined/></Button>
      </RoomInputHolder>
    </RoomHolder>
  );
}
