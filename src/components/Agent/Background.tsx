import React, {useState} from "react";
import { Flex, Typography, Divider, Card, Row, Col, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import CardContainer from "components/Agent/CardContainer";
import { selectModel, setModels } from "store/slices/AgentSlice"
import { selectMotion, setMotions } from "store/slices/AgentSlice";
import { RootState } from "store";
import axios from "axios";
import { selectBackground, setBackgrounds } from "store/slices/AgentSlice";
const Background = () => {
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState(false)
  const { backgrounds, selectedBackground } = useSelector(
    (state: RootState) => state.agent
  );

  const inputFileRef = React.useRef(null);
  const { selectedModel } = useSelector((state: RootState) => state.agent);

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
    // dispatch(setBackgrounds([loadFile.preview, ...backgrounds]));
    dispatch(setBackgrounds([loadFile.preview, ...backgrounds]));
    dispatch(selectBackground(loadFile.preview));
  };

  const convertImageToBase64 = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch the image");
      }
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error("Failed to read image as base64"));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error("Failed to convert image to base64: ");
    }
  };



  const onBackgoundChange = async() => {
    console.log("start")
    console.log(selectedModel)
    try {
    if (!selectedModel) {
        console.error("No model selected");
        return;
    }
    const imageFile = selectedModel;
    
    const imageBase64 = await convertImageToBase64(selectedModel);


      const response = await fetch("http://34.148.69.171:5000/backremove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          image:imageBase64,
          audio:"audio testing",
          text:"prompt"
         }),
      });
      if (response.ok) {
        const data = await response.json();
        // Handle response data as needed
        console.log("testing", data.path);
        dispatch(selectModel(data.path))
        console.log("comple");
      } else {
        // Handle error
        console.error("Failed to generate agent:", response.statusText);
      }
    } catch (error) {
      console.error("Error generating agent:", error);
    } finally{
    }
    console.log("finished")
  }

  const ChangeBackgound = async() => {
    console.log("start")
    console.log(selectedModel)
    setIsChange(true)
    try {
    if (!selectedModel) {
        console.error("No model selected");
        return;
    }
    const imageFile = selectedModel;
    const backgroundFile = selectedBackground
    const imageBase64 = await convertImageToBase64(selectedModel);
    let background_imageBase64: string | null = null;

    if (selectedBackground) {
      background_imageBase64 = await convertImageToBase64(selectedBackground);
      console.log("background", selectedBackground)
    }
    
      const response = await fetch("http://34.148.69.171:5000/backchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          image:imageBase64,
          background:background_imageBase64,
          text:"prompt"
         }),
      });
      if (response.ok) {
        const data = await response.json();
        // Handle response data as needed
        console.log("testing", data.path);
        dispatch(selectModel(data.path))
        console.log("comple");
      } else {
        // Handle error
        console.error("Failed to generate agent:", response.statusText);
      }
    } catch (error) {
      console.error("Error generating agent:", error);
    } finally{
      setIsChange(false)
    }
    console.log("finished")
  }

  return (
    <React.Fragment>
      <Typography.Title level={4}>
        Choose background or upload your own
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
          {backgrounds.map((back, index: number) => (
            <Col span={12} xs={8} md={6} key={index} style={{ padding: 5 }}>
              <CardContainer
                setItem={() => dispatch(selectBackground(back))}
                isSelect={selectedBackground === back}
              >
                <img src={back} alt="model" style={{ width: "100%" }} />
              </CardContainer>
            </Col>
          ))}
        </Row>
        <Button             
            type="primary"
            size="large"
            onClick={ChangeBackgound}
            loading = {isChange}
            >Change</Button>
      </Card>
    </React.Fragment>
  );
};

export default Background;
