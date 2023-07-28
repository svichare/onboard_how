import React, { useEffect } from 'react';

import * as S from "./ContactUsStyles";

const ContactUs = ({mixpanel}) => {

    useEffect(() => {
    // Add event listeners to the links with the class "socialLink"
    const trackedLinks = document.querySelectorAll('.socialLink');
    trackedLinks.forEach((link) => {
        link.addEventListener('click', () => {
        mixpanel.track('Social Link Clicked', { link_text: link.innerText });
        });
    });
    }, []);
    
  return (
    <S.ContactUsContainer>
      <h2>Email</h2>
      <S.ContactUsLabel>To contact the developer directly : shivaji.vichare@onboard.icu </S.ContactUsLabel>
      <br />
      <S.ContactUsLabel>For reporting any bugs   : bug_report@onboard.icu </S.ContactUsLabel>
      <br />
      <S.ContactUsLabel>For any other issues   : support@onboard.icu </S.ContactUsLabel>
      <br />
      <S.ContactUsLabel>If I owe you money    : donotreply@onboard.icu </S.ContactUsLabel>
      <br />
      <h2>Social media links</h2>
      <br />
      <S.ContactUsLabel><a href="https://www.linkedin.com/in/shivaji-vichare/" class="socialLink">Linkedin</a></S.ContactUsLabel>
      <br />
      <S.ContactUsLabel><a href="https://www.instagram.com/shivaxinsta/" class="socialLink">Instagram</a></S.ContactUsLabel>
      <br />
      <S.ContactUsLabel><a href="https://github.com/svichare/onboard_how" class="socialLink">Github</a></S.ContactUsLabel>
      <br />
      <S.ContactUsLabel><a href="https://isha.sadhguru.org/us/en/" class="socialLink">OnlyFans</a></S.ContactUsLabel>
      <br />
    </S.ContactUsContainer>
  );
};

export default ContactUs;
