import React, {useState, useEffect} from 'react';
import * as S from "./projectDetailsStyles";

import brain_simplify from '../../assets/brain_simplify.jpg'


export default function ProjectDetails({selectedProject, setSelectedTask}) {

  const handleSubmit = () => {
    setSelectedTask({name:'Home', id:999});
  };
    
return (
  <S.Container>
    <S.TopImage src={brain_simplify} alt="brain_simplify" />
    <h1><b>{selectedProject.name}</b></h1>
    <br />
    <p>On the left Sidebar, there is a curated list of topics. </p>
    <p>Complete every topic to make sure you have a complete picture of the project you are working on.</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p><b>FYI</b>: The project's unique id is <b>{selectedProject.uniqueId}</b></p>
    <br />
    <p>Email the id to yourself so that you wont lose the stored data.</p>
    <p>Share it with your teammates to combine the knowledge of the team in one place.</p>
    <S.Comic>Dont share it with that one colleague though.</S.Comic>

    <br />
    <S.ProjectResetSubmit type="button" onClick={handleSubmit}>Work on a different project</S.ProjectResetSubmit>

  </S.Container>
);
}