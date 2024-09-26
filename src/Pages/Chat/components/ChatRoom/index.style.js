import Title from "antd/es/typography/Title";
import { styled } from "styled-components";

export const RoomHolder = styled("div")`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  display: inline;
  padding: 0 12px;

  @media (max-width: 768px) {
    padding:0px 0px;
    width:93%;
  }
`;

export const RoomInputHolder = styled("div")`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  position: sticky;
  top: 90%;
  padding: 12px 20%;
  background-color: white;
  border-radius: 12px;
  border-bottom: 0px;
  box-shadow: 0 0 10px #ddd;
  
 @media (max-width: 768px) {
   position:absolute;
   top:90%; 
   width:52%;
  }

`;

export const TitleStyle = styled(Title)`
  background-color:white;
  text-align:center;
  padding:5px;
  border-radius:12px;
`

export const RoomMessageHolder = styled("div")`
  height:70vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding:12px;
  border-radius:12px;
  overflow-y:auto;
`;
