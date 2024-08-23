import { Flex, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import type { RootState } from "store";
import axios from "axios";
import { selectMotion, setMotions } from "store/slices/AgentSlice";


import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';



const Conversation = (props:any) => {
  const {isMotion, setIsMotion} = props
  const { selectedModel } = useSelector((state: RootState) => state.agent);
  const { audios, selectedAudio } = useSelector(
    (state: RootState) => state.agent
  );
  const [userInput, setUserInput] = useState('')
  // const [isMotion, setIsMotion] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const ref = useRef()
  const [messsage, setMessage] = useState([
    {
      type:"bot",
      content:"Hello, How can I help you?"
    }
  ])
  const inputChnage = (e:any) =>{
    setUserInput(e.target.value)
  }
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


  const handleGenerate = async (txt:string) => {
    // setIsLoading(true)
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
          text:txt
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
  };


  // const handleGPT = async(msg:string) =>{
  //   console.log("chatgpt response");
  //   // const response  = await fetch("http://34.31.16.151:5000/chat", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body:  JSON.stringify({
  //   //     message:msg
  //   //   })
  //   // })
  //   // console.log("response is :", response.data)



  //   // await axios
  //   // .post("http://34.148.69.171:3001/chat", {'message':msg})
  //   // .then((res:any)=>{
  //   //   const response = res.data;
  //   //   console.log(response['data'])
  //   //   await handleGenerate(response['data'])
  //   //   setMessage((preMessage) => [...preMessage, {
  //   //     type:"bot",
  //   //     content: response['data']
  //   //   }])
  //   // } )
    
  // }

  const handleGPT = async(msg:string) =>{
    console.log("chatgpt response");
    // const response  = await fetch("http://34.31.16.151:5000/chat", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body:  JSON.stringify({
    //     message:msg
    //   })
    // })
    // console.log("response is :", response.data)
    setIsLoading(true)
    await axios
    .post("http://34.148.69.171:5000/chat", {'message':msg})
    .then(async (res:any)=>{
      const response = res.data;
      console.log(response['data'])
      await handleGenerate(response['data'])
      setMessage((preMessage) => [...preMessage, {
        type:"bot",
        content: response['data']
      }])
    } )
  }

  const onSend = async() => {
    handleGPT(userInput)
    setMessage((preMessage) => [...preMessage, {
      type:"user",
      content:userInput
    }])
    setUserInput('')
  }
  const onScrollMove = () =>{
    const mainRoof = document.getElementById("ref")
    mainRoof?.scrollIntoView({behavior:"smooth"})
  }
  useEffect(()=>{
    onScrollMove()
    console.log("scroll move")
  }, [messsage])
  return (
    <div>
      <div style={{height:"150px", overflow:"auto"}} className="message-list">
        {
          messsage.map((msg, index)=>(
            <div key={index}>
              {msg.type =="bot" && (
                  <Flex justify="flex-start">
                  <div
                    style={{
                      borderWidth: 0,
                      margin:5,
                      padding: 10,
                      backgroundColor: "#EEEEEE",
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                  >
                    {msg.content}
                  </div>
                </Flex>
              )}
              {msg.type =="user" && (
                <Flex justify="flex-end">
                  <div
                    style={{
                      borderWidth: 0,
                      margin:5,
                      padding: 10,
                      backgroundColor:"#1677ff",
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: 600,
                    }} 
                  >
                    {msg.content}
                  </div>
                </Flex>
              )}
            </div>
          ))
        }
        {isLoading? ( <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />): <div></div>}
        <div id="ref" className="ref"></div>
      </div>
      <Input
        style={{ marginTop: 20 }}
        size="large"
        autoComplete="off"
        placeholder="Type a message..."
        value={userInput}
        onChange={inputChnage}
        onKeyDown={(e)=>{
          if(e.key=="Enter"){
            onSend()
          }
        }}
        suffix={
          <Button
            shape="circle"
            type="primary"
            size="large"
            onClick={onSend}
          >
            <SendOutlined />
          </Button>
        }
      />
    </div>
  );
};

export default Conversation;
