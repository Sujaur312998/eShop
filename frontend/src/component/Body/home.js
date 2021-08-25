import React, { useEffect } from 'react'
import { isUserLogined, userAuthenticate } from '../../redux/auth/authAction'
import { host } from '../../constants/hostConst'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    
    useEffect(() => {
        dispatch(isUserLogined())
        isUserAuthenticated(window.store.getState().authReducer.token)
    }, [])

    const isUserAuthenticated = async (token) => {
        if (token === null) {
            history.push('/signin')
        } else {
            try {
                const res = await fetch(`${host}/api/profile`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                //console.log(res)
                if (res.status === 200) {
                    //history.push('/')
                    dispatch(userAuthenticate(true))
                } else {
                    dispatch(userAuthenticate(false))
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <div className="jumbotron jumbotron-fluid mt-5 pt-5 text-center">
            <div className="container">
                <h1 className="display-4"> Welcome to Admin Dashboard</h1>
                <p className="lead">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente commodi error nihil, corrupti nisi, quo aspernatur alias nostrum quis quibusdam amet eligendi. Voluptate laudantium assumenda, voluptatum maiores atque cum impedit nihil aliquid asperiores dolore consequuntur! Est, consequatur distinctio, aperiam sunt pariatur fuga quae deserunt voluptas modi odit natus ullam? Libero?
                </p>
            </div>
        </div>
    )
}

export default Home