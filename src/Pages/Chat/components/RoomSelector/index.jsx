import { useState } from "react";
import { If } from "../../../../components/If";
import { RoomCreator } from "./Components/RoomCreator";
import { Button, Input } from "antd";
import { GetGroupsByName } from "../../../../Classes/Requests/GroupRequests/Get";
import { useChat } from "../../../../hooks/chat.hook";
import { AllRoomsHolder } from "./index.style";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { RoomMapper } from "./Components/RoomMaper";
import { useException } from "../../../../hooks/exception.hook";

const roomWrapperStyles = {
  minWidth: "400px",
  float: "right",
  textAlign: "center",
  boxShadow:"0px 0px 10px #ddd",
  minHeight: "92.7vh",
  backgroundColor:"white"
};

export function RoomSelector({
  rooms,
  setSelectedRoom,
  setRooms,
  selectedRoom,
}) {
  const { connection } = useChat();
  const [searchString, setSearchString] = useState("");
  const [searchedRooms, setSearchedRooms] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const {setter} = useException();

  const handleChangeSearch = (e) => {
    setSearchString(e.target.value);
  };

  const handleClickSearch = async () => {
    const request = new GetGroupsByName(searchString);

    var response = await request.Send();
    var json = await response.json();
    var result = await json;

    setSearchedRooms(result);
  };

  const subscribeToRoom = async (groupId) => {
    try {
      if (connection && connection._connectionState === "Connected") {
        connection.invoke("SubscribeToGroup", groupId);
      }
    } catch (e) {
      setter(e)
    }
  };

  async function handleOnClickSearchRoom(Room) {
    try {
      setSelectedRoom(null);
      await subscribeToRoom(Room.id);
      setSelectedRoom(Room);
    } catch (error) {
      setter(error);
    }
  }

  return (
    <div style={roomWrapperStyles}>
      <AllRoomsHolder>
        <If condition={!isSearching}>
          <RoomCreator setGroups={setRooms} />
          <Button onClick={() => setIsSearching(true)}>
            <SearchOutlined />
          </Button>
          <If condition={rooms != null && rooms.length}>
            <RoomMapper
              rooms={rooms}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
            />
          </If>
        </If>
        <If condition={isSearching}>
          <Input
            style={{ width: "50%", marginTop: "12px" }}
            value={searchString}
            onChange={handleChangeSearch}
          />
          <Button onClick={handleClickSearch}>
            <SearchOutlined />
          </Button>
          <If condition={searchedRooms.length}>
            <RoomMapper
              rooms={searchedRooms}
              selectedRoom={selectedRoom}
              setSelectedRoom={handleOnClickSearchRoom}
            />
          </If>
          <Button onClick={() => setIsSearching(false)}>
            <CloseOutlined />
          </Button>
        </If>
      </AllRoomsHolder>
    </div>
  );
}
