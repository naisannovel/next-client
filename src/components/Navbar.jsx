import React, { useContext, useState } from 'react';
import logo from '../assets/images/logo.png';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../utilities/authUtilities';
import { logout } from './authentication/auth';
import { userInfoContext } from '../App';

const NavBar = (props) => {
  const [user,setUser] = useContext(userInfoContext);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='navbar__main__container'>
      <Navbar color="light" light expand="md">
      <div className="container navbar__container">
        <NavbarBrand  onClick={()=> history.push('/')}>
            <img src={logo} alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <Link to='/'>Home</Link>
            </NavItem>
            <NavItem>
              <Link to='/my/post'>My Post</Link>
            </NavItem>
            <NavItem>
              <Link to='/add/post'>Add Post</Link>
            </NavItem>
            <NavItem>
              {
                isAuthenticated(null) ? 
                <button onClick={()=>logout(()=>{ setUser({...user,userData:{}}); history.push('/') })} className='primary__btn' style={{background:'#FF00B5'}}>Log Out</button>:
                <button className='primary__btn' onClick={()=> history.push('/login')}>Log In</button>
              }
            </NavItem>
          </Nav>
        </Collapse>
      </div>
      </Navbar>
    </div>
  );
}

export default NavBar;