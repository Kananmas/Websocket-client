import { Input } from "antd";
import { styled } from "styled-components";

export const RoomHolder = styled("div")`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  display: inline;
  padding: 0 12px;
`;

export const RoomInputHolder = styled("div")`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  position: sticky;
  top: 90%;
  bottom: 0%;
  padding: 12px 20%;
  background-color: white;
  border: 1px dashed black;
  border-radius: 12px;
  border-bottom: 0px;
`;

export const RoomMessageHolder = styled("div")`
  min-height: 83vh;
  display: flex;
  flex-direction: column;
`;
