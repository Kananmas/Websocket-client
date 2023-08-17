import { styled } from "styled-components";

export const BodyWrapper = ({ isMe, children }) => {
  const bodyColor = isMe ? "green" : "blue";
  const Wrapper = styled("div")`
    background-color: ${bodyColor};
    border-radius: 14px;
    padding: 2px 12px;
    max-width: 200px;
  `;

  return <Wrapper>{children}</Wrapper>;
};
