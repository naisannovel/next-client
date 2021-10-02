import React from 'react';

const Footer = () => {
    return (
        <div className='footer__container'>
            <p>© { new Date().getFullYear() } Next, All Rights Reserved</p>
        </div>
    );
};

export default Footer;