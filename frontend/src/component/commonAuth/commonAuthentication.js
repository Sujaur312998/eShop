import { host } from '../../constants/hostConst'

export const isUserAuthenticated = async (token) => {
    try {
        const res = await fetch(`${host}/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if(res.status ===200){
            return res.status
        }else{
            return null
        }
        
    } catch (e) {
        console.log(e)
    }
}
