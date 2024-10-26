import { useMutation, useQueryClient } from "react-query"
import { api } from "./service-api"
import { httpClient } from "./service-axios"
import { useNavigate } from "react-router-dom"

const initLogin =(loginData:{email:String,password:string})=>{
 return httpClient.post(api.auth.login,loginData)
}


const useLoginMutation =()=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(initLogin,{
        onSuccess:(response:any)=>{
            console.log("I am successful")
        },
        onError:(error:any)=>{
            console.log("I am error")
        }
    })
}

export {
    useLoginMutation
}
