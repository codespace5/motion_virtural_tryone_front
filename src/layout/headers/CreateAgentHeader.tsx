import { useDispatch } from "react-redux";
import { Flex, Typography, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { setStep } from "store/slices/AgentSlice";
import { useNavigate } from "react-router-dom";

const CreateAgentHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step } = useSelector((state: RootState) => state.agent);

  return (
    <Flex align="center" justify="space-between" style={{ height: "100%" }}>
      <Typography.Title
        level={2}
        style={{ margin: 0, width: 150, textAlign: "center" }}
      >
        New agent
      </Typography.Title>
      <Flex gap={10}>
        <Button
          size="large"
          style={{ width: 150 }}
          disabled={step === 0}
          onClick={() => {
            if (step === 0) {
            } else {
              dispatch(setStep(step - 1));
            }
          }}
        >
          Back
        </Button>
        <Button
          type="primary"
          size="large"
          style={{ width: 150 }}
          onClick={() => {
            if (step === 6) {
            } else {
              dispatch(setStep(step + 1));
            }
          }}
        >
          Next
        </Button>
      </Flex>
      <Flex style={{ width: 150 }} align="center" justify="flex-end">
        <Button
          // onClick={() => navigate("/agents")}
          shape="circle"
          icon={<CloseOutlined />}
          size="large"
        />
      </Flex>
    </Flex>
  );
};

export default CreateAgentHeader;
