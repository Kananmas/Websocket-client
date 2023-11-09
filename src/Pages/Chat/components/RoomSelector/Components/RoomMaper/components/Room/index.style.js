import { styled } from "styled-components";

export const RoomWrapper = styled("div")`
  border: 1px dotted black;
  border-right: 0px;
  border-left: 0px;
  margin: 13px 0;
  text-align: start;

  display: flex;
  align-items: strech;
`;

export const RightSide = styled("div")`
  flex: 7;
  padding-left: 8px;
  &:hover {
    background-color: gray;
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
