import React, {useState, useEffect} from 'react';
import * as S from "./AboutStyles";

import about_mushroom from '../../assets/photos/about_mushroom.jpg'
import about_rish_crop2 from '../../assets/photos/about_rish_crop2.jpg'
import about_alone from '../../assets/photos/about_alone.jpg'

export default function About() {

return (
    <S.AboutContainer>
        {/* <S.AboutTopImage src={about_rish_crop2} alt="about_rish_crop2" /> */}
        <p><b>[Tool in alpha phase, but functional. Feel free to play around on laptop/monitor.]</b></p>
        <br></br>
        <p>Onboarding onto a new software project is hard. It is a stressful time </p>
        <p>when you are meeting new teammates, forming new connections, getting used to </p>
        <p>new tools, shortcuts and lunch conversations.</p>
        <p>At the same time you need to learn a completely new codebase. Here you need to balance</p>
        <p>the need for showing productivity with the urge of learning everything in the tech stack in detail.</p>
        <p>Juggling all this requires a lot of emotional intelligence <cite>which you clearly don't have</cite>.</p>
        <p>That's where onboard.icu can help.</p>
        <br></br>
        <p>By using the tool to onboard, you will get a list of tasks to do and a list of data points to learn.</p>
        <p>You can track your progress and document all the important information you have learnt.</p>
        <p>You can share the project with your teammates to create a shared knowledge-base. </p>
        <p>Onboarding any new teammate will be a matter of sharing this link with that poor soul. </p>
        <br></br>
        <p>As a software engineer I have onboarded on a variety of projects, from storage devices to cloud backends.</p>
        <p>I have worked with superstar engineers who I have seen go from zero to hyper-productive in a matter of weeks.</p>
        <p>From observing what these engineers do naturally, I have created this tool for the rest.</p>
        <p>Hope you find it as useful as I do. Thanks! </p>
        <p>- Satoshi Nakamoto</p>
        <S.AboutTopImage src={about_alone} alt="about_alone" />
    </S.AboutContainer>
);
}
