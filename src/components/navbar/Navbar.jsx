import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo_redhat_blue.png';
import './navbar.css';

const Navbar = ({setSelectedTask}) => {
   const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        {/* <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div> */}
        <div className="gpt3__navbar-sign">
          <button type="button" onClick={() => setSelectedTask({name:'', id:0})}>Home</button>
        </div>
        {/* <div className="gpt3__navbar-sign">
          <button type="button">Testimonials</button>
        </div> */}
        <div className="gpt3__navbar-sign">
          <button type="button" onClick={() => setSelectedTask({name:'ContactUs', id:999})}>Contact Us</button>
        </div> 
        <div className="gpt3__navbar-sign">
          <button type="button" onClick={() => setSelectedTask({name:'About', id:999})}>About</button>
        </div>
        <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#dashboard">Learning dashboard</a></p>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <p>Sign in</p>
            <button type="button">Sign up</button>
          </div>
        </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;