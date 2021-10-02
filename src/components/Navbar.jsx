import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

const NavBar = (props) => {
    const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='navbar__main__container'>
      <Navbar color="light" light expand="md">
      <div className="container navbar__container">
        <NavbarBrand href="/">
            <img src="assets/images/logo.png" alt="logo" />
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
              <button className='primary__btn' onClick={()=> history.push('/login')}>Log In</button>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
      </Navbar>
    </div>
  );
}

export default NavBar;