import { useEffect , useState } from "react";
import { useChat } from "../../../../hooks/useChat";
import Title from "antd/es/typography/Title";
import { Button, Input } from "antd";
import { Message } from "./components/Message";
import { RoomHolder, RoomInputHolder, RoomMessageHolder } from "./index.style";
import { randomString } from "../../../../utils/random-string.utils";
import { SendOutlined } from "@ant-design/icons";

export function ChatRoom({ SelectedRoom }) {
  const { connection } = useChat();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);



  const updateMessages = (data) => {
    try {
      setMessages([]);
      if(!SelectedRoom || !data.length) return;
      var roomId = data[0]?.roomId
      if(roomId == SelectedRoom.id)
        setMessages(data);
    }
    catch (e) {
      console.log(e.message);
    }
  };
  const getChatMessages =async () => {
    try {
      if (connection && connection._connectionState == "Connected") {
        connection.on("RecivieChatMessages", updateMessages);

        connection.invoke("GetChatMessagesForMe", SelectedRoom.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessages = async () => {
    try {
        if (connection && connection._connectionState == "Connected") {
          connection.on("RecivieChatMessages", updateMessages);
          connection.invoke("SendNewMessage", messageText, SelectedRoom.id);
        }
    } catch (e) {
      console.log(e);
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
      <Title level={3}>{SelectedRoom.name}</Title>
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
