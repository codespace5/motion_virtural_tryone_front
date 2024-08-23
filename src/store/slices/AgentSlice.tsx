import { createSlice } from "@reduxjs/toolkit";
import { models, clothes, backgrounds, audios, motions } from "utils/data";

interface IinitialState {
  step: number;
  models: Array<string>;
  selectedModel: string | null;
  clothes: Array<string>;
  selectedClothes: string | null;
  backgrounds: Array<string>;
  selectedBackground: string | null;
  audios: Array<any>;
  selectedAudio: any;
  motions: Array<any>;
  selectedMotion: any;
}

export const initialState: IinitialState = {
  step: 0,
  models: models,
  selectedModel: models[0],
  clothes: clothes,
  selectedClothes: clothes[0],
  backgrounds: backgrounds,
  selectedBackground: backgrounds[0],
  audios: audios,
  selectedAudio: audios[0],
  motions: motions,
  selectedMotion: motions[0],
};

export const AgentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setModels: (state, action) => {
      state.models = action.payload;
    },
    selectModel: (state, action) => {
      state.selectedModel = action.payload;
    },
    setClothes: (state, action) => {
      state.clothes = action.payload;
    },
    selectClothes: (state, action) => {
      state.selectedClothes = action.payload;
    },
    setBackgrounds: (state, action) => {
      state.backgrounds = action.payload;
    },
    selectBackground: (state, action) => {
      state.selectedBackground = action.payload;
    },
    setAudios: (state, action) => {
      state.audios = action.payload;
    },
    selectAudio: (state, action) => {
      state.selectedAudio = action.payload;
    },
    setMotions: (state, action) => {
      state.motions = action.payload;
    },
    selectMotion: (state, action) => {
      state.selectedMotion = action.payload;
    },
  },
});

export const {
  setModels,
  setClothes,
  setStep,
  selectClothes,
  selectModel,
  setBackgrounds,
  selectBackground,
  setAudios,
  selectAudio,
  setMotions,
  selectMotion,
} = AgentSlice.actions;

export default AgentSlice.reducer;
