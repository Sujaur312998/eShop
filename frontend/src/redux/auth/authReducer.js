import * as actionTypes from './authActionType'

const initialState = {
    token: null,
    user: {
        fullName: '',
        email: '',
        role: ''
    }
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            const { token, user } = action.payload
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            return {
                ...state,
                token:token,
                user: {
                    fullName: user.name,
                    email: user.email,
                    role: user.role
                }
            }

        case actionTypes.LOGIN_FAILED:
            return state
        default: return state
    }
}


