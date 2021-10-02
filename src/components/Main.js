import React, { lazy, Suspense } from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Spinner from '../utilities/Spinner';
import PrivateRouter from './authentication/PrivateRouter';

const Home = lazy(()=> import('./home/Home'));
const AddPost = lazy(()=> import('./AddPost'));
const MyPost = lazy(()=> import('./MyPost'));
const Login = lazy(()=> import('./authentication/Login'));
const Signup = lazy(()=> import('./authentication/Signup'));

const Main = () => {
    return (
        <Suspense fallback={<Spinner/>}>
            <Navbar/>
            <Switch>
                <Route path='/' exact component={Home} />
                <PrivateRouter path='/add/post' exact>
                    <AddPost/>
                </PrivateRouter>
                <PrivateRouter path='/my/post' exact>
                    <MyPost/>
                </PrivateRouter>
                <Route path='/login' exact component={Login} />
                <Route path='/signup' exact component={Signup} />
                <Redirect to='/' />
            </Switch>
        </Suspense>
    );
};

export default Main;