import { Room } from "./components/Room";

export function RoomMapper({ rooms, setSelectedRoom, selectedRoom }) {
  return (
    <>
      {rooms.map((room) => {
        return <div key={room.Id}  style={{ marginTop: "12px" }}>
          <Room Room={room} setSelectedRoom={setSelectedRoom} selectedRoom={selectedRoom} />
        </div>
      })}
    </>
  );
}
