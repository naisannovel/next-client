import React, { lazy, Suspense } from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Spinner from '../utilities/Spinner';

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
                <Route path='/add/post' exact component={AddPost} />
                <Route path='/my/post' exact component={MyPost} />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' exact component={Signup} />
                <Redirect to='/' />
            </Switch>
        </Suspense>
    );
};

export default Main;