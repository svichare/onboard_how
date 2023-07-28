import React, {useState, useEffect} from 'react';
import * as S from "./AboutStyles";

import about_mushroom from '../../assets/photos/about_mushroom.jpg'
import about_rish_crop2 from '../../assets/photos/about_rish_crop2.jpg'
import about_alone from '../../assets/photos/about_alone.jpg'

export default function About() {

return (
    <S.AboutContainer>
        {/* <S.AboutTopImage src={about_rish_crop2} alt="about_rish_crop2" /> */}
        <p><b>[Tool in alpha phase, but functional. Feel free to play around. Launch scheduled in Dec 2023]</b></p>
        <br></br>
        <p>Onboarding is hard. Much more so for introverted software engineers. </p>
        <p>It is usually at the mercy of how much time and patience the nicest engineer on the team has.</p>
        <br></br>
        <p>The aim of this tool is to make onboarding a standardized process. A process at the end of which </p>
        <p>the engineer is equipped with all the information needed to be productive.</p>
        <p>It does this by giving a list of tasks and information an engineer should do and learn.</p>
        <p> This way the engineer either knows the information or has an idea of the accumulated learning debt.</p>
        <br></br>
        <p>As a Software Engineer I have onboarded on a variety of projects, from storage devices to cloud backends.</p>
        <p>I have worked with superstar engineers who I have seen go from zero to hyper-productive in a matter of weeks.</p>
        <p>From observing what these engineers do naturally, I have created this tool for the rest.</p>
        <p>Hope you find it as useful as I do. Thanks! </p>
        <p>- Satoshi Nakamoto</p>
        <S.AboutTopImage src={about_alone} alt="about_alone" />
    </S.AboutContainer>
);
}
