import axios from "axios";
import {MessagePlugin} from "tdesign-vue-next";
import {hasCookie, removeCookie} from "./utils/utils";
axios.defaults.baseURL="/"
axios.interceptors.request.use((config) =>{
    return config
})

axios.interceptors.response.use((response) => {
    if(response.status === 200){
        return response
    }else {
        // MessagePlugin.error(response.data.message, 2000)
        return Promise.reject(response)
    }
},
    (error) => {
        const response = error.response
        console.log(response)
        if(response.data){
            response.message = response.data.message
        }
        console.log(response.message)
        if(response.status === 401){
            if(hasCookie("JWT_TOKEN")){
                removeCookie("JWT_TOKEN")
                MessagePlugin.error("JWT无效或过期，请重新登录", 2000)
            }else {
                MessagePlugin.error("请先登录", 2000)
            }
        }else {
            MessagePlugin.error(response.message, 2000)
        }

        return Promise.resolve()
    })