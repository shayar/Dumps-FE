import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BACKEND_API;
const THREE_MINUTES = 3 * 60 * 1000;
const baseConfig = ()=>{

    console.log(baseURL,"fasdfaskjdh")
    return {
        baseURL,
        timeout: THREE_MINUTES,
        headers: {
      
        },
      };
}

const httpClient ={
    get:(url:any,config:boolean)=>{

    },
    post:(url:any,data:any)=>{
        return axios.post(url, data, {
            ...baseConfig(),
            data,
          })
    },
    patch:null,
    put:null,
    delete:null,
}

axios.interceptors.response.use(
    response => response,
    async error =>{
        return Promise.reject(error.response)
    }
)

export {
    httpClient
 }


