import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'


const Signup = () => {
    const options = [
        {
            label: "Male",
            value: "Male",
        },
        {
            label: "Female",
            value: "Female",
        },
        {
            label: "Others",
            value: "Others",
        },
    ];
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        cPassword: ''
    })
    const [gender, setGender] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(gender, user)
        setGender('')
        setUser({
            fullName: '',
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
                                <Col md={6}>
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

                                </Col>
                                <Col md={6} className='mb-3'>
                                    <label htmlFor="inputGroupSeqlect03" className="form-label mb-0">Gender</label>

                                    <Select
                                        value={selectedOption}
                                        onChange={handleChange}
                                        options={options} />

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
