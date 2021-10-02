import React from 'react';

const Hero = () => {
    return (
        <div className='container hero__container'>
            <div className="row hero__row__container">
                <div className="col-md-6 hero__content">
                    <h1>Next is a place to write, read, and connect</h1>
                    <p>It's easy and free to post your thinking on any topic and connect with millions of readers.</p>
                    <button className='primary__btn'>Start Writing</button>
                </div>
                <div className="col-md-6">
                    <img src="assets/images/hero.svg" alt="hero" />
                </div>
            </div>
        </div>
    );
};

export default Hero;