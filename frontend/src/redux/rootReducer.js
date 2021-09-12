import { combineReducers } from "redux";
import { authReducer } from './auth/authReducer'
import { categoryReducer } from './createCategory/categoryReducer'

const rootReducer = combineReducers({
    authReducer,
    categoryReducer
})

export default rootReducer