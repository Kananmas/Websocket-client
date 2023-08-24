import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useCallback } from "react";
import { LeftSide, RightSide, RoomWrapper } from "./index.style";
import { DeleteOutlined } from "@ant-design/icons";
import { useChat } from "../../../../../../hooks/useChat";

export function Room({ Room, setSelectedRoom }) {
  const { connection } = useChat()
    
  const handleOnClickRoom = useCallback((e) => {
    setSelectedRoom(Room);
  }, []);

  const handleOnClickDeleteRoom = async function(){
     try {
        if(connection || connection._connectionState === "Connected") {
            connection.invoke("RemoveRoom",Room.id);

            setSelectedRoom(null);
        }
     } catch (error) {
        console.log(error.message);
     }
  }

  if (!Room) return null;

  return (
    <RoomWrapper>
      <RightSide onClick={handleOnClickRoom}>
        <Title level={3}>{Room.name}</Title>
        <Paragraph>{Room.lastMessage ?? "No Message Founded"}</Paragraph>
      </RightSide>
      <LeftSide onClick={handleOnClickDeleteRoom}>
        <DeleteOutlined  />
      </LeftSide>
    </RoomWrapper>
  );
}
