import jwtDecode from "jwt-decode";
import { useState } from "react";
import { getAccessToken } from "../../../../../../utils/get-access-token";
import { Button, Input } from "antd";
import { useChat } from "../../../../../../hooks/useChat";
import { If } from "../../../../../../components/If";

export function RoomCreator({setGroups}) {
  const { connection } = useChat();
  const [name, setName] = useState("");
  const jwt = jwtDecode(getAccessToken());
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userID = jwt["Sid"];

  async function AddNewGroup() {
    try {
      setIsLoading(true);

      connection.on("RecivieAllRooms", (data) => {
        setGroups(data);
      });

      connection.invoke("CreateNewGroup", name, userID);
    } catch (e) {
      console.log(e)
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOnChangeName(e) {
    setName(e.target.value);
  }

  async function handleOnClickCreate() {
    await AddNewGroup();
  }

  return (
    <>
      <If condition={isOpen}>
        <div>
          <Input type="text" value={name} onChange={handleOnChangeName} />
          <Button onClick={handleOnClickCreate}>Create</Button>
        </div>
      </If>
      <If condition={!isOpen}>
        <Button style={{marginTop:"14px"}}onClick={() => setIsOpen(true)}>Create Room</Button>
      </If>
    </>
  );
}
