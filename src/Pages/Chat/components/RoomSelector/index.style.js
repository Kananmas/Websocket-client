import { styled } from "styled-components";

export const AllRoomsHolder = styled("div")`
  position: sticky;
  top: 2%;

  @media (max-width: 768px) {
    top:0%;
    width:100%;
    max-width:767px;
  }
`;



export const RoomWrapper =  styled.div`
  min-width:400px;
  text-align: center;
  box-shadow:0px 0px 10px #ddd;
  min-height: 92.7vh;
  background-color:white;
  @media (max-width:738px) {
    min-width:auto;
    width:100vw;
  }
`