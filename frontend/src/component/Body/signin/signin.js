import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { host } from '../../../constants/hostConst'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { loginSuccess, loginFailed, isUserLogined,userAuthenticate } from '../../../redux/auth/authAction'
import './signin.css'


const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        dispatch(isUserLogined())
        isUserAuthenticated(window.store.getState().authReducer.token)
    }, [])

    const isUserAuthenticated = async (token) => {
        if (token != null) {
            try {
                const res = await fetch(`${host}/api/profile`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                //console.log(res)
                if(res.status===200){
                    history.push('/')
                    dispatch(userAuthenticate(true))
                }else{
                    dispatch(userAuthenticate(false))
                }
            } catch (e) {
                console.log(e)
            }
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        //code for submit data to backend
        try {
            if (email === '' || password === "") {
                window.alert('Please fill up the login form!!!')
            } else {
                const res = await fetch(`${host}/api/admin/signin`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email, password
                    })
                })
                const data = await res.json()

                if (res.status === 200) {
                    await dispatch(loginSuccess(data.token, data.user))
                    history.push('/')
                    window.alert(data.message)
                } else {
                    await dispatch(loginFailed())
                    window.alert(data.message)
                }
            }
        } catch (e) {
            console.log(e)
        }
        console.log(email, password)
        setEmail('')
        setPassword('')
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <main className="form-signin">
                            <form onSubmit={handleSubmit}>
                                <h1 className="h3 mb-3 fw-normal mt-5 pt-5" style={{ textAlign: 'center' }}>Please sign in</h1>

                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        autoComplete='off'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        autoComplete='off'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                                <p className="mt-5 mb-3 text-muted" style={{ textAlign: 'center' }}>&copy; 2021</p>
                            </form>
                        </main>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Signin
