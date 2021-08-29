import React from 'react'
import { Route, Redirect } from 'react-router-dom';


const PrivateRouter = ({ component: Component, ...rest }) => {
    return <Route {...rest} component={(props) => {
        const token = localStorage.getItem('token')
        // console.log(props, token)
        if (token === null) {
            return <Redirect to='/signin' />
        } else {
            return <Component {...props} />
        }
    }}
    />
}

export default PrivateRouter
