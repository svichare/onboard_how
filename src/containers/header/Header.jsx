import React from 'react';
import people from '../../assets/people.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Let&apos;s onboard in style</h1>
      <p>Make onboarding on a project easy for software engineers.</p>

      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      <div className="gpt3__header-content__people">
        <img src={people} alt="people" />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div>
    </div>

  </div>
);

export default Header;