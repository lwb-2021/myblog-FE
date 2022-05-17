import axios, {AxiosResponse} from "axios";
import {MessagePlugin} from "tdesign-vue-next";

export function setCookie(cname: string,value: string,days: number) {
    const d = new Date();
    d.setTime(d.getTime()+(days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + value + "; " + expires;
}
export function getCookie(cname: string) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

export function hasCookie(cname: string){
    return getCookie(cname) === ""
}

export function removeCookie(cname: string){
    setCookie(cname, "", -1)
}

export async function getUserInfo() {
    if(hasCookie("JWT_TOKEN")){
        let user_info;
        const token = getCookie("JWT_TOKEN")
        await axios.post("/api/user/verify", {
            headers:{
                "Authorization": token,
                "Access-Control-Expose-Headers": "Authorization"
            }
        }).then((response) =>{
                user_info = response ? response.data : null
            }
        )
        return user_info
    }
    return null;

}

export function getUserHeaders() {
    const JWT_TOKEN = getCookie("JWT_TOKEN")
    if(JWT_TOKEN){
        return {
            "Authorization": JWT_TOKEN,
            "Access-Control-Expose-Headers": "Authorization"
        }
    }else {
        return {}
    }


}


export async function isUser(userId: number){
    let isUser
    await axios.post("/api/user/verify", {}, {
        headers: getUserHeaders()
    }).then(
        async (result: AxiosResponse<any>) => {
            isUser = result.data.data.id === userId
        })
    return isUser

}


export async function isAdmin(){
    let isAdmin
    await axios.post("/api/user/verify", {}, {
        headers: getUserHeaders()
    }).then(
        async (result: AxiosResponse<any>) => {
            isAdmin = result.data.data.role >=2
        })
    return isAdmin

}