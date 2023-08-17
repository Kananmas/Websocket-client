import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const HeaderWrapper = styled("div")`
  padding: 15px;
  margin-bttom: 14px;
  border-bottom: 1px solid black;
  background-color: black;
`;

export const HeaderLink = styled(Link)`
  text-decoration: none;
  margin: 0 12px;
  color: white;
  &:hover: {
    color: red;
  }
`;
