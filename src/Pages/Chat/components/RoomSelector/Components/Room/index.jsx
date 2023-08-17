import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useCallback } from "react";
import { RoomWrapper } from "./index.style";

export function Room({Room,setSelectedRoom}) {
    const handleOnClickRoom = useCallback(() => {
        setSelectedRoom(Room);
    },[])

    if(!Room) return null;

    return<RoomWrapper onClick={handleOnClickRoom}>
        <Title level={3}>{Room.name}</Title>
        <Paragraph>{Room.lastMessage ?? "No Message Founded"}</Paragraph>
    </RoomWrapper>
}