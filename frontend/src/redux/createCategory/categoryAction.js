import * as actionTypes from './actionType'
import { host } from './../../constants/hostConst';
import axios from 'axios'

export const getCategory = () => {
    return async dispatch => {
        try {
            const res = await axios.get(`${host}/category/getCategory`)
            //console.log(res.data)
            if (res.status === 200) {
                const { categoryList,category } = res.data
                dispatch({
                    type: actionTypes.GET_ALL_CATEGORY,
                    payload: {
                        category:category,
                        categoryList:categoryList
                    }
                })
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_CATEGORY_FAILED,
                    payload: { error: res.data.error }
                })
            }
        } catch (err) {
            console.log(err)
        }


    }
}