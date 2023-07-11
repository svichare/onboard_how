import React, {useState, useEffect} from 'react';
import * as S from "./styles";

import { API } from '@aws-amplify/api'
import { allProjectsPassQuery, allProjectTasks } from '../../graphql/queries'

import brain_simplify from '../../assets/brain_simplify.jpg'

async function list_projects() {
    try {
      const response = await API.graphql({
         query: allProjectsPassQuery,
         variables: {
         },
      })
      // For local testing.
      if (response.data.allProjectsPassQuery.length === 0) {
        return [{name: "Mockproject1FromFunction" , id:11}, {name: "Mockproject2FromFunction", id:22}];
      }
      return response.data.allProjectsPassQuery;
    } catch (error) {
      console.error(`Cought error in function : ${error}`);
      return [{name: "Mockproject1FromFunction" , id:11}, {name: "Mockproject2FromFunction", id:22}];
    }
  }

function ProjectTypeDropdown(props) {
    console.log("Renderring ProjectDropDown");
  
    const [selectedOption, setSelectedOption] = useState(0);
  
    if (Array.isArray(props.projectTypes)) {
      if ((selectedOption === 0) && (props.projectTypes.length > 0)) {
        setSelectedOption(props.projectTypes[0]['id']);
      }
    }
  
    const handleOptionClick = (event) => {
      setSelectedOption(event.target.value);
      console.log("Setting option to : ");
      console.log(event.target.value);
    };
  
    return (
        <S.ProjectDropDownSelect name="id" onChange={handleOptionClick}>
        <option value="">Select an option</option>
        {Array.isArray(props.projectTypes) ? (
          props.projectTypes.map((project, index) => (
            <option value={project.id} >{project.name}</option>
          ))
        ) : null}
        </S.ProjectDropDownSelect>
    );
  }

export default function ProjectInput({setSelectedProject}) {
    const [projectTypes, setProjectTypes] =
    useState([{name: "Mockproject1" , id:11, description:"Mockproject1 description"},
     {name: "Mockproject2", id:22, description:"Mockproject1 description"}]);
    
    const [localSelectedProject, setLocalSelectedProject] = useState({
        name: '',
        id: 0,
        // Add more form fields as needed
      });

    const [userEmail, setUserEmail] = useState('');
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log("Setting : ", name , " to value : ", value);
        if (name === 'email') {
          setUserEmail(value);
          return;
        }
        setLocalSelectedProject({
            ...localSelectedProject,
            [name]: value,
        });
    };

      const handleSubmit = () => {
        // Perform actions with the form values
        console.log('localSelectedProject Data:', localSelectedProject);
        setSelectedProject(localSelectedProject);
        // Create entry in the documentDB if requierd.
        let id = localSelectedProject.name + ':' + localSelectedProject.id + ':' + userEmail;
        console.log("Setting project ID to : " + id );
      };

      useEffect( () => {
        list_projects()
      .then((projects_from_async) => {
        setProjectTypes(projects_from_async);
      });
    }, []);
return (
  <S.Container>
    <S.TopImage src={brain_simplify} alt="brain_simplify" />
    <h1>Test your expertise on current project..</h1>
    <S.ProjectNameInput name="name" type="text" placeholder="Project name" onChange={handleInputChange}/>
    <br />
    <p>Project type : </p>
    <S.ProjectTypeDropDown name="id" placeholder="Project type.." onChange={handleInputChange}>
        {Array.isArray(projectTypes) ? (
        <ProjectTypeDropdown projectTypes={projectTypes} />
        ) : null}
    </S.ProjectTypeDropDown>
    <br/>
    <S.EmailInput name="email" type="text" placeholder="Your email address (to sell on darkweb)" onChange={handleInputChange}/>
    <br/>
    <S.ProjectSelectSubmit type="button" onClick={handleSubmit}>Lets get started</S.ProjectSelectSubmit>
  </S.Container>
);
}