import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AgentSlice from "./slices/AgentSlice";
import ThemeSlice from "./slices/ThemeSlice";

export const rootReducer = combineReducers({
  theme: ThemeSlice,
  agent: AgentSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
