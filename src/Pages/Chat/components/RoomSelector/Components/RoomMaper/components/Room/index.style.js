import { styled } from "styled-components";

export const RoomWrapper = styled("div")`
  border-right: 0px;
  border-left: 0px;
  text-align: start;
  display: flex;
`;

export const RightSide = styled("div")`
  flex: 7;
  padding-left: 8px;
  &:hover {
    background-color: rgba(222, 220, 225);
  }
`;

export const LeftSide = styled("div")`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: red;
    color: white;
  }
`;
