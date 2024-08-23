import React, {useState} from "react";
import { Flex, Divider, Typography, Card, Row, Col, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import CardContainer from "components/Agent/CardContainer";
import { selectModel, setModels } from "store/slices/AgentSlice"
import { RootState } from "store";
import { setClothes, selectClothes } from "store/slices/AgentSlice";

const Clothes = () => {
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState(false)
  const [clothesType, setClothesType] = useState('')

  const { clothes, selectedClothes } = useSelector(
    (state: RootState) => state.agent
  );
  const { selectedModel } = useSelector((state: RootState) => state.agent);
  const inputFileRef = React.useRef(null);

  const Upload = () => {
    if (inputFileRef.current) {
      const inputElement = inputFileRef.current as HTMLInputElement;
      inputElement.click();
    }
  };

  const UploadClothes = (event: any) => {
    const { files } = event.target;
    if (files.length === 0) return;
    const loadFile = Object.assign(files[0], {
      preview: URL.createObjectURL(files[0]),
    });
    dispatch(setClothes([loadFile.preview, ...clothes]));
    dispatch(selectClothes(loadFile.preview));
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setClothesType(`${value}`)
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

  const ChangeClothes = async() => {
    console.log("start")
    console.log(selectedModel)
    setIsChange(true)
    try {
    if (!selectedModel) {
        console.error("No model selected");
        return;
    }
    const imageFile = selectedModel;
    const backgroundFile = selectedClothes
    const imageBase64 = await convertImageToBase64(selectedModel);
    let background_imageBase64: string | null = null;

    if (selectedClothes) {
      background_imageBase64 = await convertImageToBase64(selectedClothes);
      console.log("background", selectedClothes)
    }
    
      const response = await fetch("http://34.148.69.171:5002/virtualtry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          model:imageBase64,
          clothes:background_imageBase64,
          category:clothesType
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
      <Typography.Title level={4} >
        Choose your agent's clothes or upload your own
      </Typography.Title>
      <Row style={{ display:'flex', justifyContent:'center', alignItems:'center', gap: 35}}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Clothes type: 
        </Typography.Title>
          <Select
          defaultValue="upperbody"
          style={{ width: 120}}
          onChange={handleChange}
          options={[
            { value: 0, label: 'upperbody' },
            { value: 1, label: 'lowerbody' },
            { value: 2, label: 'dress' },
          ]}

        />
      </Row>
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
                  onChange={UploadClothes}
                  ref={inputFileRef}
                />
              </Flex>
            </CardContainer>
          </Col>
          {clothes.map((clo, index: number) => (
            <Col span={12} xs={8} md={6} key={index} style={{ padding: 5 }}>
              <CardContainer
                setItem={() => dispatch(selectClothes(clo))}
                isSelect={selectedClothes === clo}
              >
                <img src={clo} alt="model" style={{ width: "100%" }} />
              </CardContainer>
            </Col>
          ))}
            <Button             
            type="primary"
            size="large"
            onClick={ChangeClothes}
            loading = {isChange}
            >Change</Button>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default Clothes;
