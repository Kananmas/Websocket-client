
import jwtDecode from "jwt-decode";
import { MessageContent } from "./components/MessageContent";
import { useMemo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useChat } from "../../../../../../hooks/chat.hook";
import { getAccessToken } from "../../../../../../utils/get-access-token.utils";

const messageStyle = (messeageDir, isMe) => ({
  alignSelf: messeageDir,
  display: "flex",
  margin: "2px",
  flexDirection: isMe ? "row" : "row-reverse",
  alignItems: "center",
});

export function Message({ Message, roomId }) {
  const { connection } = useChat();
  const jwt = jwtDecode(getAccessToken());
  const userName = Object.values(jwt)[0];

  const { id, senderName, text, createdDate } = Message;;
  const dateOptions = { hour: "numeric", minute: "numeric" };
  const dateString = new Date(createdDate).toLocaleDateString(
    "en-IR",
    dateOptions
  );
  const isMe = senderName === userName;

  const messeageDir = isMe ? "flex-end" : "flex-start";
  const displayName = isMe ? "You" : senderName;

  const messageProp = useMemo(
    () => ({
      isMe,
      text,
      displayName,
      dateString,
    }),
    []
  );

  const deleteMessage = async () => {
    try {
      if (connection || connection._connectionState == "Connected") {
        connection.invoke("DeleteMessage", id, roomId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickDelete = () => {
    deleteMessage();
  };

  return (
    <div style={messageStyle(messeageDir, isMe)}>
      <div style={{ padding: "12px" }}>
        <DeleteOutlined onClick={handleOnClickDelete} />
      </div>
      <MessageContent {...messageProp} />
    </div>
  );
}
