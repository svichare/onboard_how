import React from 'react';
// import people from '../../assets/people.png';
import brain_simplify from '../../assets/brain_simplify.jpg'
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
    <div className="gpt3__header-image">
        <img src={brain_simplify} alt="brain_simplify" />
    </div>
      <h1 className="gradient__text">Let&apos;s onboard the right way</h1>
      <p>The Learning dashboard will guide you through the process of onboarding onto a new Software project.</p>
      <p>Log-in with your credentials to save your progress. </p>

      {/* Commenting out until the width of the email input box can be configured.
      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div> */}

      {/* <div className="gpt3__header-content__people">
        <img src={people} alt="people" />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div> */}

    </div>


  </div>
);

export default Header;