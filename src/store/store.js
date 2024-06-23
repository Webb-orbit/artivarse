import {configureStore} from "@reduxjs/toolkit"
import authslice from "./Authslice"
import creatorslice from "./Creatorslice"

export const stores =  configureStore({
    reducer:{
        authstore: authslice,
        creatorstore: creatorslice,
    }
})