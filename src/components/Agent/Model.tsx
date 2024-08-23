import React from "react";
import { Flex, Typography, Divider, Card, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import CardContainer from "components/Agent/CardContainer";
import { RootState } from "store";
import { selectModel, setModels } from "store/slices/AgentSlice";

const Model = () => {
  const dispatch = useDispatch();
  const { models, selectedModel } = useSelector(
    (state: RootState) => state.agent
  );
  const inputFileRef = React.useRef(null);

  const Upload = () => {
    if (inputFileRef.current) {
      const inputElement = inputFileRef.current as HTMLInputElement;
      inputElement.click();
    }
  };

  const UploadModel = (event: any) => {
    const { files } = event.target;
    if (files.length === 0) return;
    const loadFile = Object.assign(files[0], {
      preview: URL.createObjectURL(files[0]),
    });
    dispatch(setModels([loadFile.preview, ...models]));
    dispatch(selectModel(loadFile.preview));
  };

  return (
    <React.Fragment>
      <Typography.Title level={4}>
        Choose your agent's model or upload your own
      </Typography.Title>
      <Divider />
      <Card>
        <Row>
          <Col span={12} xs={8} md={6} style={{ padding: 5 }}>
            <CardContainer upload={Upload}>
              <Flex vertical justify="center" align="center">
                <UploadOutlined style={{ fontSize: 30, color: "grey" }} />
                <Typography.Title
                  style={{ margin: 0, color: "grey" }}
                  level={5}
                >
                  UPLOAD
                </Typography.Title>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={inputFileRef}
                  onChange={UploadModel}
                />
              </Flex>
            </CardContainer>
          </Col>
          {models.map((model, index: number) => (
            <Col span={12} xs={8} md={6} key={index} style={{ padding: 5 }}>
              <CardContainer
                setItem={() => dispatch(selectModel(model))}
                isSelect={selectedModel === model}
              >
                <img src={model} alt="model" style={{ width: "100%" }} />
              </CardContainer>
            </Col>
          ))}
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default Model;
