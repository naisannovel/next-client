import React from 'react';
import { useHistory } from 'react-router';

const Hero = () => {
    const history = useHistory();
    return (
        <div className='hero__container'>
            <div className="container row hero__row__container">
                <div className="col-md-6 hero__content">
                    <h1>Next is a place to write, read, and connect</h1>
                    <p>It's easy and free to post your thinking on any topic and connect with millions of readers.</p>
                    <button onClick={()=>history.push('/add/post')} className='primary__btn'>Start Writing</button>
                </div>
                <div className="col-md-6">
                    <img src="assets/images/hero.svg" alt="hero" />
                </div>
            </div>
        </div>
    );
};

export default Hero;