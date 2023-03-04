import React, {useState, useEffect} from "react"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { API } from '@aws-amplify/api'
import { allProjectsPassQuery, allProjectTasks } from '../../graphql/queries'

import './dashboard.css';

API.configure({
  "aws_project_region": process.env.REACT_APP_PROJECT_REGION,
  "aws_appsync_graphqlEndpoint": process.env.REACT_APP_APPSYNC_GRAPHQLENDPOINT,
  "aws_appsync_region": process.env.REACT_APP_APPSYNC_REGION,
  "aws_appsync_authenticationType": process.env.REACT_APP_APPSYNC_AUTHENTICATIONTYPE,
  "aws_appsync_apiKey": process.env.REACT_APP_APPSYNC_APIKEY
})

async function list_projects() {
    const response = await API.graphql({
       query: allProjectsPassQuery,
       variables: {
       },
    })
    return response.data.allProjectsPassQuery;
}

async function list_project_tasks(id) {
  const response = await API.graphql({
     query: allProjectTasks,
     variables: {
      projectId:id
     },
  })
  return response.data.allProjectTasks;
}

function ProjectDropdown(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect( () => { 
    console.log("In ProjectDropdown's useEffect");
      // New project selected from dropdown.
      list_project_tasks(selectedOption)
        .then((project_tasks_from_async) => {
          props.setProjectTasks(project_tasks_from_async)
          }
        );

  }, [selectedOption]);

  const handleOptionClick = (event) => {
    setSelectedOption(event.target.value);
    console.log("Setting option to : ");
    console.log(selectedOption);
  };

  return (
    <div className="dropdown">
      <select value={selectedOption} onChange={handleOptionClick}>
      {Array.isArray(props.projects) ? (
        props.projects.map((project, index) => (
          <option key={project.id} value={project.id}>{project.name}</option>
        ))
      ) : null}
      </select>
    </div>
  );
}

function TasksSidebar(props) {
  return (
      <div>
        {props.projectTasks.map((value, index) => (
          <ListItem button>
          <ListItemText style={{ paddingLeft: 5 }}>
              <span key={value.id}>{value.name}</span>
            </ListItemText>
          </ListItem>
        ))}
        </div>
  );
}

function Dashboard({ items, depthStep, depth }) {
  const [projects, setProjects] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [originalProject, setOriginalProject] = useState(null);

  const onItemClick = (project) => {
    console.log("Project selected from Dropdown");
    if (originalProject.id === project.id) {
      console.log("Same project selected!!");
      return;
    }
    console.log("Different project selected. Fetching project tasks.");
    setOriginalProject(selectedProject);
    setSelectedProject(project);
    list_project_tasks(project.id)
      .then((project_tasks_from_async) => {
          setProjectTasks(project_tasks_from_async);
        }
      );
  };

  useEffect( () => { 
    console.log("Possibly Fetching data")
    if (projects.length<1) {
      console.log("Fetching data Required")
      // Loading project and sidebar for the first time.
      list_projects()
        .then((projects_from_async) => {
          setProjects(projects_from_async);
          setOriginalProject(projects_from_async[0]);
          setSelectedProject(projects_from_async[0]);
          list_project_tasks(projects_from_async[0].id)
            .then((project_tasks_from_async) => {
                setProjectTasks(project_tasks_from_async);
              }
            );
          });
    } else if (originalProject.id !== selectedProject.id) {
      // New project selected from dropdown.
      list_project_tasks(selectedProject.id)
        .then((project_tasks_from_async) => {
            setProjectTasks(project_tasks_from_async);
          }
        );
    } else {
      console.log("Fetching data NOT Required")
    }
  }, []);

  function setprojectTasksInFunction(array) {
    setProjectTasks(array);
  }
  return (
    <div className="gpt3__dashboard" id="dashboard">
      <div className="gpt3__dashboard_dropdown">
        {Array.isArray(projects) ? (
          <ProjectDropdown projects={projects} setProjectTasks={setProjectTasks}/>
        ) : null}
      </div>
      <List disablePadding dense>
        <TasksSidebar projectTasks={projectTasks}/>
      </List>
    </div>
  );

}

export default Dashboard