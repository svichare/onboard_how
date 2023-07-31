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
        <br></br>
        <p>That's where onboard.icu can help.</p>
        <p>By using the tool to onboard, you will get a list of tasks to do and a list of data points to learn.</p>
        <p>You can track your progress and document all the important information you have learnt.</p>
        <p>The tool will ensure there are no blindspots in your mental model of the project. </p>
        <p>It will ensure you won't get distracted by the fog of artificial deadlines. </p>
        <br></br>
        <br></br>
        <p>Remember .. </p>
        <p> .. your manager and team work for you until you onboard. </p>
        <p> .. you can command their time and attention.</p>
        <p> .. just like they will demand your performance once the onboarding ends.</p>
        <p> .. don't waste those precious onboarding weeks... grab them by the horn .. hit them out of the park .. </p>
        <p> .. send them up in space and make them land upright on a drone ship..</p>
        <p> .. you have my blessings !
        </p>
        <br></br>
        <p>- Satoshi Nakamoto</p>
        <S.AboutTopImage src={about_alone} alt="about_alone" />
    </S.AboutContainer>
);
}
