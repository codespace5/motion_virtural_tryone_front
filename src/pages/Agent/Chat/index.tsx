import { Layout, Image, Flex, Divider, Card } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Conversation from "components/Agent/Conversation";

const { Content } = Layout;

const AgentChat = () => {
  const { models } = useSelector((state: RootState) => state.agent);

  return (
    <Content
      style={{
        padding: "0px 20px",
        maxWidth: 1200,
        margin: "20px auto 20px auto",
        width: "100%",
      }}
    >
      <Flex justify="center">
        <Image src={models[0]} width={250} preview={false} />
      </Flex>
      <Divider />
      <Flex justify="center">
        <Card
          style={{
            width: "100%",
            maxWidth: 700,
          }}
        >
          <Conversation />
        </Card>
      </Flex>
    </Content>
  );
};

export default AgentChat;
