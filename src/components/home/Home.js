import React, { lazy, Suspense } from 'react';
import Spinner from '../../utilities/Spinner';

const Hero = lazy(()=> import('./Hero'));
const Posts = lazy(()=> import('./Posts'));
const Footer = lazy(()=> import('./Footer'));

const home = () => {
    return (
        <div className='home__container'>
            <Suspense fallback={<Spinner/>}>
                <Hero/>
                <Posts/>
                <Footer/>
            </Suspense>
        </div>
    );
};

export default home;