import React, { Suspense } from 'react';
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom'
import Config from './config/'
import Test from './pages/test/test'
import Product from './pages/Product/index'
const App = () => {
    return (
        <Suspense fallback={<div>加载中</div>}>
            <HashRouter >
                <Switch>
                    <Route exact path="/" component={Test} />
                    <Route exact path="/a" component={Product} />
                    <Route exact path="/b" component={() => {
                        return <Redirect exact to="/home2" />
                    }} />
                </Switch>
            </HashRouter>
        </Suspense>
    )
}

export default App