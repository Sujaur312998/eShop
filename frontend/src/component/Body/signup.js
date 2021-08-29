import React, { useState,useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import { host } from '../../constants/hostConst'
import { useHistory } from "react-router-dom"
import { isUserLogined, userAuthenticate } from '../../redux/auth/authAction'
import { useDispatch } from 'react-redux'

const Signup = () => {
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
                if (res.status === 200) {
                    history.push('/')
                    dispatch(userAuthenticate(true))
                } else {
                    dispatch(userAuthenticate(false))
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    const options = [
        {
            label: "Male",
            value: "male",
        },
        {
            label: "Female",
            value: "female",
        },
        {
            label: "Others",
            value: "None of them",
        },
    ]

    const [user, setUser] = useState({
        fullName: '',
        contactNum: '',
        email: '',
        password: '',
        cPassword: ''
    })
    const [gender, setGender] = useState('')


    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({
            ...user,
            [name]: value
        })

    }
    const { selectedOption } = gender

    const handleChange = (selectedOption) => {
        setGender({ selectedOption })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(gender.selectedOption, user)
        const { fullName, email, password, cPassword, contactNum } = user
        //code for submit data to backend
        if (gender.selectedOption === undefined || fullName === '' || email === '' || password === "" || cPassword === "") {
            window.alert('Please fill all fileds')
        } else {
            if (password === cPassword) {
                try {
                    const res = await fetch(`${host}/api/admin/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            fullName, email, password, contactNum, gender: gender.selectedOption.value
                        })
                    })
                    const data = await res.json()
                    //console.log(data)

                    if (res.status === 200) {
                        history.push('/signin')
                        window.alert(data.message)
                    } else {
                        const { fullName, email, password, contactNum } = data.message.errors
                        if (fullName || email || password || contactNum) {
                            if (fullName) {
                                window.alert(fullName.message)
                            } else if (email) {
                                window.alert(email.message)
                            }
                        } else if (contactNum) {
                            window.alert(contactNum.message)
                        } else if (password) {
                            window.alert(password.message)
                        }
                    }
                } catch (e) {

                }
            }
        }

        setGender('')
        setUser({
            fullName: '',
            contactNum: '',
            email: '',
            password: '',
            cPassword: ''
        })
    }

    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <div className="form-group mb-3">
                                    <label htmlFor='formBasicName'>Name</label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        id="formBasicName"
                                        name='fullName'
                                        placeholder='Name'
                                        autoComplete='off'
                                        value={user.fullName}
                                        onChange={handleInput}
                                    />
                                </div>
                                <Col md={7}>
                                    <div className="form-group mb-3">
                                        <label htmlFor='formBasicContactNum'>Contact Number</label>
                                        <input
                                            type='number'
                                            className="form-control"
                                            id="formBasicContactNum"
                                            name='contactNum'
                                            placeholder='+8801 ... ... ...'
                                            autoComplete='off'
                                            value={user.contactNum}
                                            onChange={handleInput}
                                        />
                                    </div>

                                </Col>
                                <Col md={5} className='mb-3'>
                                    <label htmlFor="inputGroupSeqlect03" className="form-label mb-0">Gender</label>

                                    <Select
                                        value={selectedOption}
                                        onChange={handleChange}
                                        options={options}
                                    />

                                </Col>
                            </Row>
                            <div className="form-group mb-3">
                                <label htmlFor='formBasicEmail'>Email address</label>
                                <input
                                    type='email'
                                    className="form-control"
                                    id="formBasicEmail"
                                    name='email'
                                    placeholder='Enter email'
                                    autoComplete='off'
                                    value={user.email}
                                    onChange={handleInput}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor='formBasiPassword'>Password</label>
                                <input
                                    type='password'
                                    className="form-control"
                                    id="formBasiPassword"
                                    name='password'
                                    placeholder='Password'
                                    autoComplete='off'
                                    value={user.password}
                                    onChange={handleInput}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor='formBasicCPassword'>Confirm Password</label>
                                <input
                                    type='password'
                                    className="form-control"
                                    id="formBasicCPassword"
                                    name='cPassword'
                                    placeholder='Confirm password'
                                    autoComplete='off'
                                    value={user.cPassword}
                                    onChange={handleInput}
                                />
                            </div>

                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup
