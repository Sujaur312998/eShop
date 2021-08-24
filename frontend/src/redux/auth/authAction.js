import * as actionType from './authActionType'


export const loginSuccess=(token,user)=>{
    return {
        type: actionType.LOGIN_SUCCESS,
        payload:{
            token,user
        }
    }
}