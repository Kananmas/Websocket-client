import Title from "antd/es/typography/Title";
import { BodyWrapper } from "./index.style";
import Paragraph from "antd/es/typography/Paragraph";

export function MessageContent({isMe , displayName , text , dateString}) {
    return <div>
     <Title level={5}>{displayName}</Title>
    <BodyWrapper isMe={isMe}>
      <p style={{color:"white"}}>{text}</p>
    </BodyWrapper>
    <Paragraph>{dateString.slice(dateString.indexOf(",") + 1)}</Paragraph>
    </div>
}