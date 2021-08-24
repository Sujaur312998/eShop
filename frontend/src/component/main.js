import React from 'react'
import Header from './Navbar/header'
import { Switch, Route } from 'react-router-dom'
import Home from './Body/home'
import Signin from './Body/signin/signin'
import Signup from './Body/signup'


const Main = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
            </Switch>
        </div>
    )
}

export default Main
