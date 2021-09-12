import * as actionTypes from './actionType'

const initialState = {
    categories: [],
    categoryList:[]
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CATEGORY:
            return {
                ...state,
                categories: action.payload.category,
                categoryList:action.payload.categoryList
            }

        default: return state

    }
}