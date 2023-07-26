import React, {useState, useEffect} from 'react';
import * as S from "./AboutStyles";

import about_mushroom from '../../assets/photos/about_mushroom.jpg'
import about_rish_crop2 from '../../assets/photos/about_rish_crop2.jpg'
import about_alone from '../../assets/photos/about_alone.jpg'

export default function About() {

return (
    <S.AboutContainer>
        <S.AboutTopImage src={about_alone} alt="about_alone" />
        {/* <S.AboutTopImage src={about_rish_crop2} alt="about_rish_crop2" /> */}
        <p>Onboarding is hard. It is even harder for introverted software engineers. </p>
        <br></br>
        <p>Engineers are eager to prove their abilities. Hence the jump into writing</p>
        <p>working code or fixing the first bug.</p>
        <p>By the time the first real code is submitted, the crucial first few weeks are over.</p>
        <p>In that time, the engineer typically gets to know only a small subsystem in the project.</p>
        <br></br>
        <p>As the tenure of the engineer on the project increases, the window to ask basic questions</p>
        <p> to others gets narrower. Learning those aspects through self-study is possible but typically</p>
        <p> takes 10 times more effort than just asking someone.   </p>
        <br></br>
        <p>The aim of this tool is to help engineers make maximum use of the initial window to gain knowledge</p>
        <p> as fast as possible .</p>

    </S.AboutContainer>
);
}
