import { toast } from "react-toastify"
import axios from "../../Config/Axios"
import { onLoad } from "../Reducer/UserReducer"
export const Userlogout=()=>async(dispatch)=>{
    try {
        localStorage.removeItem("User")
        dispatch(CurrentUser())
    } catch (error) {
        console.log(error)
    }
}
export const CurrentUser=()=>async(dispatch)=>{
    try {
        const user=localStorage.getItem("User")
        if(user){
            dispatch(onLoad(user))
        }
    } catch (error) {
        console.log(error)
    }
}
export const UserRegister=(user)=>async()=>{
    try {
        const res= await axios.post("/user",user)
        if(res.status==201){
             return true
        }else{
            return false
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
}
export const UserLogin=(user)=>async()=>{
   try {
     const {data}=await axios.get(`/user?email=${user.email}&password=${user.password}`)
    if(data.length>0){
        localStorage.setItem("User",JSON.stringify(data[0]))
       return true
    }
    else{
         return false
    }
   } catch (error) {
        toast.error(error.message)
   }
}
export const UpdateUser=(id,user)=>async(dispatch)=>{
    try {
        const res= await axios.patch("/user/"+id,user) 
        console.log(res)
        if(res.status==200){
            dispatch(CurrentUser())
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
    }

}