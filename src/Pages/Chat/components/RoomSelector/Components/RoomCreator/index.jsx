import jwtDecode from "jwt-decode";
import { useState } from "react";
import { getAccessToken } from "../../../../../../utils/get-access-token.utils";
import { Button, Input } from "antd";
import { useChat } from "../../../../../../hooks/chat.hook";
import { If } from "../../../../../../components/If";
import { CloseOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useException } from "../../../../../../hooks/exception.hook";

export function RoomCreator({ setGroups }) {
  const { connection } = useChat();
  const [name, setName] = useState("");
  const jwt = jwtDecode(getAccessToken());
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userID = jwt["Sid"];
  const {setter} = useException();

  async function AddNewGroup() {
    try {
      setIsLoading(true);

      connection.on("RecivieAllRooms", (data) => {
        setGroups(data);
      });

      connection.invoke("CreateNewGroup", name, userID);
    } catch (e) {
      setter(e);
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

  if (isLoading) {
    return <LoadingOutlined />;
  }

  return (
    <div style={{ padding: "12px 0" }}>
      <If condition={isOpen}>
        <Input
          style={{ marginTop: "14px", width: "50%" }}
          type="text"
          value={name}
          onChange={handleOnChangeName}
        />
        <Button onClick={handleOnClickCreate}>
          <PlusOutlined />
        </Button>
        <Button onClick={() => setIsOpen(false)}>
          <CloseOutlined />
        </Button>
      </If>
      <If condition={!isOpen}>
        <Button onClick={() => setIsOpen(true)}>
          <PlusOutlined />
        </Button>
      </If>
    </div>
  );
}
