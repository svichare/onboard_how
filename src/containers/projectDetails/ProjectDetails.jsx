import React, {useState, useEffect} from 'react';
import * as S from "./projectDetailsStyles";

import brain_simplify from '../../assets/brain_simplify.jpg'


export default function ProjectDetails({selectedProject}) {
    
return (
  <S.Container>
    <S.TopImage src={brain_simplify} alt="brain_simplify" />
    <h1><b>{selectedProject.name}</b></h1>
    <br />
    <p>Go through topics listed on the left sidebar. Each topic has a list of action items. </p>
    <p>These action items will help you gain the knowledge required to work productively.</p>
    <br />
    <br />
    <p><b>FYI</b>: The project's unique id is <b>{selectedProject.uniqueId}</b></p>
    <br />
    <p>Email the id to yourself so that you wont lose the stored data.</p>
    <p>Share it with your teammates to combine the knowledge of the team in one place.</p>
    <S.Comic>Dont share it with that one colleague though.</S.Comic>
  </S.Container>
);
}