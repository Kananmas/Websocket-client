import { Room } from "./components/Room";

export function RoomMapper({ rooms, setSelectedRoom, selectedRoom }) {
  return (
    <>
      {rooms.map((room) => {
       return <Room key={room.Id} Room={room} setSelectedRoom={setSelectedRoom} selectedRoom={selectedRoom}/>;
      })}
    </>
  );
}
