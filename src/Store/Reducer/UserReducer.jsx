import {  createSlice } from "@reduxjs/toolkit"

const initialState={
    data:[]
}
const userReducer=createSlice({
    name:"user",
    initialState,
    reducers:{
         onLoad:(state,action)=>{
            console.log("Action",action.payload)
            state.data=action.payload
        }
    }
})
export const {onLoad}=userReducer.actions
export default userReducer.reducer