import React, { useState } from 'react';

import * as S from "./ContactUsStyles";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Form data:', formData);
  };

  return (
    <S.ContactUsContainer>
      <h2>Email</h2>
      <S.ContactUsLabel>For any technical issues : support@onboard.icu </S.ContactUsLabel>
      <br />
      <S.ContactUsLabel>For reporting any bugs   : bug_report@onboard.icu </S.ContactUsLabel>
      <br />
      <S.ContactUsLabel>If I owe you money    : donotreply@onboard.icu </S.ContactUsLabel>
      <br />
      <h2>Social media</h2>
      <br />
      <S.ContactUsLabel><a href="https://www.linkedin.com/in/shivaji-vichare/">Linkedin</a></S.ContactUsLabel>
      <br />
      <S.ContactUsLabel><a href="https://www.instagram.com/shivaxinsta/">Instagram</a></S.ContactUsLabel>
      <br />
      <S.ContactUsLabel><a href="https://github.com/svichare/onboard_how">Github</a></S.ContactUsLabel>
      <br />
      <S.ContactUsLabel><a href="https://isha.sadhguru.org/us/en/">OnlyFans</a></S.ContactUsLabel>
      <br />
    </S.ContactUsContainer>
  );
};

export default ContactUs;
