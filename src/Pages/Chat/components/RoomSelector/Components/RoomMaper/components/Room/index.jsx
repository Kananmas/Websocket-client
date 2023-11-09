import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useCallback } from "react";
import { LeftSide, RightSide, RoomWrapper } from "./index.style";
import { DeleteOutlined } from "@ant-design/icons";
import { useChat } from "../../../../../../../../hooks/useChat";

export function Room({ Room, setSelectedRoom , selectedRoom}) {
  const { connection } = useChat();
  const isSelected = selectedRoom?.id === Room?.id;

  const handleOnClickRoom = useCallback((e) => {
    if(isSelected) return;
    setSelectedRoom(Room);
  }, [Room,selectedRoom,selectedRoom]);

  const handleOnClickDeleteRoom = async function () {
    try {
      if (connection && connection._connectionState === "Connected") {
        connection.invoke("RemoveRoom", Room.id);

        setSelectedRoom(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!Room) return null;

  return (
    <RoomWrapper style={{backgroundColor:isSelected ? "gray":""}}>
      <RightSide onClick={handleOnClickRoom}>
        <Title level={3}>{Room.name}</Title>
        <Paragraph>{Room.lastMessage ?? "No Message Founded"}</Paragraph>
      </RightSide>
      <LeftSide onClick={handleOnClickDeleteRoom}>
        <DeleteOutlined />
      </LeftSide>
    </RoomWrapper>
  );
}
