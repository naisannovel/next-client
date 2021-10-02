import React, { lazy, Suspense } from 'react';
import Spinner from '../../utilities/Spinner';

const Hero = lazy(()=> import('./Hero'));
const Posts = lazy(()=> import('./Posts'));
const Footer = lazy(()=> import('./Footer'));

const home = () => {
    return (
        <Suspense fallback={<Spinner/>}>
            <Hero/>
            <Posts/>
            <Footer/>
        </Suspense>
    );
};

export default home;