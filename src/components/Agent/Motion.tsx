import React from "react";
import { Typography, Divider, Card, Flex, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import { RootState } from "store";
import { selectMotion, setMotions } from "store/slices/AgentSlice";
import CardContainer from "./CardContainer";

const Motion = () => {
  const dispatch = useDispatch();
  const { motions, selectedMotion } = useSelector(
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
    dispatch(setMotions([loadFile.preview, ...motions]));
    dispatch(selectMotion(loadFile.preview));
  };

  return (
    <React.Fragment>
      <Typography.Title level={4}>Choose motion</Typography.Title>
      <Divider />
      <Card>
        <Row>
          <Col span={24} xs={12} style={{ padding: 5 }}>
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
          {motions.map((motion, index: number) => (
            <Col span={24} xs={12} key={index} style={{ padding: 5 }}>
              <CardContainer
                setItem={() => dispatch(selectMotion(motion))}
                isSelect={selectedMotion === motion}
              >
                <ReactPlayer url={motion} width={"100%"} height={200} />
              </CardContainer>
            </Col>
          ))}
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default Motion;
