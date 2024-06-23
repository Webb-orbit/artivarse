import { createSlice } from "@reduxjs/toolkit";

const init = {
    status:false,
    creatorid:null,
}

export const creatorslice = createSlice({
    name:"creatorslice",
    initialState:init,
    reducers:{
        creatorlogin(state, action){
            state.status = true,
            state.creatorid = action.payload
        },
        creatorlogout(state){
            state.status = false,
            state.creatorid = null
        }
    }
})

export const {creatorlogin, creatorlogout} = creatorslice.actions
export default creatorslice.reducer