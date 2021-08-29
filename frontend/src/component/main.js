import React from 'react'
import Header from './Navbar/header'
import { Switch, Route } from 'react-router-dom'
import Home from './Body/DashBoard/home'
import Signin from './Body/signin/signin'
import Signup from './Body/signup'
import PrivateRouter from '../HOC/PrivateRouter'
import Orders from './Body/Order/order'
import Products from './Body/Products/products'
import Customers from './Body/Customers/customers'

const Main = () => {
    return (
        <div>
            <Header />
            <Switch>
                <PrivateRouter path='/' exact component={Home} />

                <PrivateRouter path='/products' exact component={Products} />
                <PrivateRouter path='/orders' exact component={Orders} />
                <PrivateRouter path='/customers' exact component={Customers} />

                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
            </Switch>
        </div>
    )
}

export default Main
