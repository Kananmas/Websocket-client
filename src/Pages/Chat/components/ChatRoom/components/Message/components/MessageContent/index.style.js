import { styled } from "styled-components";

export const BodyWrapper = ({ isMe, children }) => {
  const bodyColor = isMe ? "green" : "blue";
  const corner = isMe? "border-bottom-right-radius:12px;":"border-bottom-left-radius:12px";
  const Wrapper = styled("div")`
    background-color: ${bodyColor};
    border-radius: 200px;
    padding: 1px 24px;
    max-width: 200px;
    ${corner}
  `;

  return <Wrapper>{children}</Wrapper>;
};
