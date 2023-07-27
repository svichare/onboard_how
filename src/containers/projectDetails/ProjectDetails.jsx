import React, {useState, useEffect} from 'react';
import * as S from "./projectDetailsStyles";

import brain_simplify from '../../assets/brain_simplify.jpg'


export default function ProjectDetails({selectedProject, setSelectedTask, mixpanel}) {

  const handleSubmit = () => {
    setSelectedTask({name:'Home', id:999});
    mixpanel.track('Project Switch Clicked', {});
  };
    
return (
  <S.Container>
    <S.TopImage src={brain_simplify} alt="brain_simplify" />
    <h1>Lets go deeper into "<b>{selectedProject.name}</b>" project</h1>
    <br />
    <p>On the left Sidebar, you will see a list of topics. </p>
    <p>Each topic page has a list of specific data points that you need to know.</p>
    <br/>
    <p>Take control of your onboarding by making sure you have knowledge of all these topics.</p>
    <p>Document the information in this tool. Make sure the information is always fresh.</p>
    <S.Comic>It's either this or Leetcode .... choose wisely</S.Comic>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p><b>*IMPORTANT*</b>: This project's unique id is <b>{selectedProject.uniqueId}</b></p>
    <p>Store this id carefully to retrieve submitted data the next time you access the tool.</p>
    <br />
    <p>Share it with your teammates to combine the knowledge of the team in one place.</p>
    <S.Comic>Dont share it with that one colleague though.</S.Comic>

    <br />
    <S.ProjectResetSubmit type="button" onClick={handleSubmit}>Switch Project</S.ProjectResetSubmit>

  </S.Container>
);
}