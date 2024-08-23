import React, {useState} from "react";
import { Typography, Divider, Card, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { selectAudio, setAudios } from "store/slices/AgentSlice";
import { assert } from "console";

const Audio = () => {
  const dispatch = useDispatch();
  const { audios, selectedAudio } = useSelector(
    (state: RootState) => state.agent
  );
  const inputFileRef = React.useRef(null);
  // const [onvalue, setOnvalue] = useState('')
  const [onvalue, setOnvalue] = useState(selectedAudio ? selectedAudio.name : (audios[0] ? audios[0].name : ''));
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
    dispatch(setAudios([loadFile.preview, ...audios]));
    dispatch(selectAudio(loadFile.preview));
  };
  const onStart = ()=> {
    console.log("path", selectedAudio)
  }

  const onValueChange = (value: string) => {
    const selected = audios.find(audio => audio.name === value);
    if (selected) {
      console.log('Selected value:', selected); // Debugging log
      setOnvalue(selected.name);
      dispatch(selectAudio(selected));
    }
  };

  return (
    <React.Fragment>
      <Typography.Title level={4}>
        Choose voice
      </Typography.Title>
      <Divider />
      <Card>
        <Select
          value={onvalue}
          options={audios.map((audio: any, index: number) => ({
            key: index,
            label: audio.name,
            value: audio.name
          }))}
          style={{ width: "100%" }}
          onChange={onValueChange}
        />
      </Card>
      {selectedAudio && <audio src={selectedAudio.audio} controls style={{width:"100%"}}/>}
    </React.Fragment>
  );
};

export default Audio;


