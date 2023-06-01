import React, {useState, useEffect} from 'react';
import * as S from "./projectDetailsStyles";

import brain_simplify from '../../assets/brain_simplify.jpg'


export default function ProjectDetails({selectedProject}) {
    
return (
  <S.Container>
    <S.TopImage src={brain_simplify} alt="brain_simplify" />
    <h1>Lets get into the details of the project "<b>{selectedProject.name}</b>"..</h1>
    <p>  . </p>
    <p>On the left sidebar you will see list of topics. Complete the forms to get a score.</p>
  </S.Container>
);
}