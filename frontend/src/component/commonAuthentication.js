import { host } from '../constants/hostConst'

export const isUserAuthenticated = async (token) => {
    try {
        const res = await fetch(`${host}/api/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}
