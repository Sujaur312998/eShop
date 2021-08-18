import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Input from '../UI/input'


const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        setEmail('')
        setPassword('')
    }
    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <form onSubmit={handleSubmit} >
                            <Input
                                label='Email address'
                                type="email"
                                name='email'
                                id='formBasicEmail'
                                aria_describedby="emailHelp"
                                placeholder="Enter email"
                                autoComplete='off'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Input
                                label='Password'
                                type="password"
                                name='password'
                                id='formBasicPassword'
                                aria_describedby="passwordHelpBlock"
                                placeholder="password"
                                autoComplete='off'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signin
