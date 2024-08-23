import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Layout,
  Flex,
  Button,
  Row,
  Col,
  Image,
  Card,
  Input,
  Steps,
  Result,
} from "antd";
import type { RootState } from "store";
import ReactPlayer from "react-player";

import Model from "components/Agent/Model";
import Clothes from "components/Agent/Clothes";
import Conversation from "components/Agent/Conversation";
import Background from "components/Agent/Background";
import Audio from "components/Agent/Audio";
import Motion from "components/Agent/Motion";
import { steps } from "utils/data";
import { selectMotion, setMotions } from "store/slices/AgentSlice";
import { selectModel, setModels } from "store/slices/AgentSlice"
import { useState } from "react";

const { Content, Footer } = Layout;

const CreateAgent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedModel } = useSelector((state: RootState) => state.agent);
  const { motions, selectedMotion } = useSelector((state: RootState) => state.agent);
  const { audios, selectedAudio } = useSelector(
    (state: RootState) => state.agent
  );
  const { step } = useSelector((state: RootState) => state.agent);
  const [isMotion, setIsMotion] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState('')

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
          text:prompt
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


  const handleGenerate = async () => {
    console.log("audise12312313", selectedAudio.name)
    setIsLoading(true)
    if(step === 3) {
        console.log("changing background")
         await onBackgoundChange()
        setIsLoading(false)
    }else {
      console.log(selectedModel)
      try {
      if (!selectedModel) {
          console.error("No model selected");
          return;
      }
      const imageFile = selectedModel;
      
      const imageBase64 = await convertImageToBase64(selectedModel);

        const response = await fetch("http://34.148.69.171:5000/videogen", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            image:imageBase64,
            audio:selectedAudio.name,
            text:prompt
          }),
        });
        if (response.ok) {
          const data = await response.json();
          // Handle response data as needed
          console.log("testing", data.path);
          dispatch(selectMotion(data.path))
          setIsMotion(true)
        } else {
          // Handle error
          console.error("Failed to generate agent:", response.statusText);
        }
      } catch (error) {
        console.error("Error generating agent:", error);
      } finally{
        setIsLoading(false)
      }
    }

  };

  return (
    <React.Fragment>
      <Content
        style={{
          padding: "0px 20px",
          maxWidth: 1000,
          margin: "20px auto 120px auto",
          width: "100%",
        }}
      >
        <Row>
          {step === 2 || step === 6 || step ==7 ? <Col span={24} sm={6}></Col> : null}
          <Col span={24} sm={12} style={{ padding: "0px 20px" }}>
            {/* <Image
              style={{ width: "100%" }}
              src={selectedModel ? selectedModel : ""}
            /> */}
            {isMotion ? (
              <ReactPlayer url={ selectedMotion} width={"100%"} height={586} playing controls/>
            ):
              <Image
                style={{ width: "100%" }}
                src={selectedModel ? selectedModel : ""}
              />
          }
            {/* {step <4 || step ==  5 ? ( */}
            {step == 3 || step ==  5 ? (
              <Card>
                {/* <Input.TextArea
                  style={{ resize: "none", fontSize: 20 }}
                  onChange={(e)=>{setPrompt(e.target.value)}}
                  placeholder={`Please input prompt to generate ${
                    step === 0
                      ? "model"
                      : step === 1
                      ? "clothes"
                      : step === 2
                      ? "person"
                      : "background"
                  }...`}
                /> */}
                  <Input.TextArea
                  style={{ resize: "none", fontSize: 20 }}
                  onChange={(e)=>{setPrompt(e.target.value)}}
                  placeholder={`Please input prompt to generate ${
                      "background"
                  }...`}
                />
                <Flex justify="flex-end" style={{ marginTop: 15 }}>
                  {/* <Button size="large" type="primary" onClick={handleGenerate}>
                    {step === 0
                      ? "Generate model"
                      : step === 1
                      ? "Generate clothes"
                      : step === 2
                      ? "Generate person"
                      : "Generate background"
                      }
                  </Button> */}
                  {/* <Button
                    size="large"
                    type="primary"
                    onClick={handleGenerate}
                    loading={isLoading} // Set loading attribute based on isLoading state
                  >
                    {isLoading ? 'Generating...' : ( // Change button label based on isLoading state
                      step === 0 ? "Generate model" :
                      step === 1 ? "Generate clothes" :
                      step === 2 ? "Generate person" :
                      step === 3 ? "Generate Background":  
                      "Say this"
                    )}
                  </Button> */}

                  <Button
                    size="large"
                    type="primary"
                    onClick={handleGenerate}
                    loading={isLoading} // Set loading attribute based on isLoading state
                  >
                    {isLoading ? 'Generating...' : ( // Change button label based on isLoading state
                      step === 3 ? "Generate Background":  
                      "Say this"
                    )}
                  </Button>


                </Flex>
              </Card>
            ) : step === 6 ? (
              <Card>
                <Conversation isMotion = {isMotion} setIsMotion ={setIsMotion} />

              </Card>
            ) : null}
          </Col>
          {step === 2 || step === 6 ? <Col span={24} sm={6}></Col> : null}
          <Col span={24} sm={12}>
            {step === 0 ? (
              <Model />
            ) : step === 1 ? (
              <Clothes />
            ) : step === 2 ? null : step === 3 ? (
              <Background />
            ) : step === 4 ? (
              <Audio />
            ) : step === 5 ? (
              <Motion />
            ) : null}
          </Col>
        </Row>
      </Content>
      <Footer
        style={{
          borderTop: "1px solid rgb(219, 219, 219)",
          background: "white",
          position: "fixed",
          bottom: 0,
          width: "100%",
          padding: "20px 50px",
        }}
      >
        <Flex justify="center">
          <Steps
            style={{ maxWidth: 600, width: "100%" }}
            items={steps.map((s: string, index: number) => {
              return {
                key: index,
                icon: (
                  <Flex align="center" justify="center">
                    <img
                      src={s}
                      width={50}
                      style={{
                        filter: index < step ? "grayscale(100%)" : undefined,
                      }}
                    />
                  </Flex>
                ),
              };
            })}
          />
        </Flex>
      </Footer>
    </React.Fragment>
  );
};

export default CreateAgent;


