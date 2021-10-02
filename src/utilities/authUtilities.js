import jwt_decode from 'jwt-decode';

export const isAuthenticated = cb => {
    if (typeof window === 'undefined') return false;
    if (localStorage.getItem('token')) {
        const { exp, name, email } = jwt_decode(JSON.parse(localStorage.getItem('token')));
        if ((new Date()).getTime() <= exp * 1000) {
            if(cb !== null){
                cb({name,email});
            }
            return true;
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            return false;
        }
    } else return false;
}