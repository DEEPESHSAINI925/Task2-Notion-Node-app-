import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./Reducer/UserReducer"
const Store=configureStore({
    reducer:{
        user:userReducer
    }
})
export default Store