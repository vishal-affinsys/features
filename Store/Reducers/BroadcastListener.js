import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  messages: [],
};

export const messagelice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {},
});

export default messagelice.reducer;
export const addListener = messagelice.actions.addMessageListener;
export const removeListener = messagelice.actions.removeMessageListener;
