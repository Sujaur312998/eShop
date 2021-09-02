import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import Sidebar from '../DashBoard/sidebar'
import { isUserAuthenticated } from '../../commonAuthentication'
import { isUserLogined, userAuthenticate } from '../../../redux/auth/authAction'
import {useHistory} from 'react-router-dom'

const Customers = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(async () => {
        dispatch(isUserLogined())
        const token = window.store.getState().authReducer.token
        const res = await isUserAuthenticated(token)
        try {
            if (res=== 200) {
                dispatch(userAuthenticate(true))
            } else {
                dispatch(userAuthenticate(false))
                history.push('/signin')
            }
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Customers</h1>

                    </div>
                </main>
            </div>

        </div>
    )
}

export default Customers

