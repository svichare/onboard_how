import React, {useState, useEffect} from 'react';
import * as S from "./styles";

import { API, graphqlOperation  } from '@aws-amplify/api'
import { allProjectsPassQuery, allProjectTasks, userProjectDetails } from '../../graphql/queries'
import { createUserProject } from '../../graphql/mutations'

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

async function create_user_project(localSelectedProject) {
  const direct_project_details = {
    uniqueId: localSelectedProject.uniqueId,
    name: localSelectedProject.name,
    typeId: localSelectedProject.typeId
  };

  try {
    const response = await API.graphql(graphqlOperation(createUserProject, {userProject: direct_project_details}));
  } catch (error) {
    console.error(`Cought error in CreateProject function : ${error}`);
  }
}

async function fetch_user_project(userProjectUniqueId) {
  const error_return_value = {name: "errorProjectPlaceholder" , id:-1,
  uniqueId: "errorUniqueId", typeId: -1};
  try {
    console.log("Fetching user project details for ID : " + userProjectUniqueId);
    const response = await API.graphql({
      query: userProjectDetails,
      variables: {
        userProjectId: userProjectUniqueId}});

    // For local testing.
    if (typeof response.data.userProjectDetails == 'undefined') {
      return error_return_value;
    }
    if (response.data.userProjectDetails.length == 0) {
      return error_return_value;
    }
    return response.data.userProjectDetails;
  } catch (error) {
    console.error(`Cought error in fetch_user_project function : ${error}`);
    return error_return_value;
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
        <S.ProjectDropDownSelect name="typeId" onChange={handleOptionClick}>
        <option value="">Select an option</option>
        {Array.isArray(props.projectTypes) ? (
          props.projectTypes.map((project, index) => (
            <option value={project.id} >{project.name}</option>
          ))
        ) : null}
        </S.ProjectDropDownSelect>
    );
  }

export default function ProjectInput({setSelectedProject, statusMessage}) {
    const [projectTypes, setProjectTypes] =
    useState([{name: "Mockproject1" , typeId:11, description:"Mockproject1 description", uniquId: "hello_world"},
     {name: "Mockproject2", typeId:22, description:"Mockproject1 description", uniqueId: "hello_earth"}]);

    const [localSelectedProject, setLocalSelectedProject] = useState({
        name: '',
        // Add more form fields as needed
      });

    const errorProject = {
      id: -1,
      name: "error_project_placeholder",
      typeId:-1
    };

    const [userEmail, setUserEmail] = useState('');
    const [storedUniqueId, setStoredUniqueId] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log("Setting : ", name , " to value : ", value);
        if (name === 'email') {
          setUserEmail(value);
          return;
        }

        if (name == 'storedUniqueId') {
          setStoredUniqueId(value);
          return;
        }
        setLocalSelectedProject({
            ...localSelectedProject,
            [name]: value,
        });
    };

      const handleSubmit = () => {
        // Perform actions with the form values
        if (storedUniqueId === '') {
          // Create entry in the documentDB if required.
          let id = localSelectedProject.uniqueId;
          console.log("Setting project uniqueId to : " + id );
          // Fetch project to see if it already exists.
          fetch_user_project(id).then( (userProject) => {
            if (userProject.id == -1) {
              // This is a legit new project. Return the values.
              console.log('localSelectedProject Data:', localSelectedProject);
              setSelectedProject(localSelectedProject);
              create_user_project(localSelectedProject);    
            } else {
              errorProject.status_message = "Unique Id already in use. (You had one job!)"
              setSelectedProject(errorProject);
            }
          });
        } else {
          // User wants to fetch existing project.
          fetch_user_project(storedUniqueId).then( (userProject) => {
            if (userProject.id == -1) {
              errorProject.status_message = "Could not fetch project linked to the Unique ID.";
              setSelectedProject(errorProject);
            } else {
              setSelectedProject(userProject);
            }
          });
        }
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
    <h1>Enter details of project you want to onboard on to..</h1>
    <S.StatusMessage>{typeof statusMessage != 'undefined' && statusMessage.length > 0 ? statusMessage : null}</S.StatusMessage>
    <S.ProjectNameInput name="name" type="text" placeholder="Project name" onChange={handleInputChange}/>
    <br />
    <p>Project type : </p>
    <S.ProjectTypeDropDown name="typeId" placeholder="Project type.." onChange={handleInputChange}>
        {Array.isArray(projectTypes) ? (
        <ProjectTypeDropdown projectTypes={projectTypes} />
        ) : null}
    </S.ProjectTypeDropDown>
    <br/>
    <S.UniqueIdInput name="uniqueId" type="text" placeholder="Unique ID (to retrive project later)" onChange={handleInputChange}/>
    <br/>
    <br />
    <br />
    <h2>OR</h2>
    <br/>
    <h3>Enter UniqueID of previously saved project</h3>
    <S.UniqueIdInput name="storedUniqueId" type="text" placeholder="Unique ID (previously used)" onChange={handleInputChange}/>
    <br/>
    <br/>
    <S.ProjectSelectSubmit type="button" onClick={handleSubmit}>Lets get started</S.ProjectSelectSubmit>
  </S.Container>
);
}