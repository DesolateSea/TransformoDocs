import { createSlice } from "@reduxjs/toolkit";

interface DarkLightState{
    mode:boolean;
};

const initialState:DarkLightState = {
    mode:false
};

export const darkLightSlice = createSlice({
    name:"mode",
    initialState,
    reducers:{
        toggleDarkLight:(state)=>{
            state.mode=!state.mode;
        }
    }
});

export const {toggleDarkLight} = darkLightSlice.actions;

export default darkLightSlice.reducer;