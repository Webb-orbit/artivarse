import { createSlice } from "@reduxjs/toolkit";

const init = {
    readerid:null,
    status:false,
    userdata:null,
    emailvariy:false,
}

export const Authslice = createSlice({
    name:"Authslice",
    initialState:init,
    reducers:{
        storelogin(state, action){
            state.status = true
            state.userdata = action.payload.id
            state.emailvariy = action.payload.varyfied
            state.readerid = action.payload.reader
        },
        storelogout(state){
            state.status = false
            state.userdata = null
            state.emailvariy = false
            state.readerid = null
        }
    }
})

export const {storelogout, storelogin} = Authslice.actions

export default Authslice.reducer