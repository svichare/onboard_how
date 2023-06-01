import React, {useState, useEffect} from "react"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { API } from '@aws-amplify/api'
import { allProjectsPassQuery, allProjectTasks } from '../../graphql/queries'

import './dashboard.css';

API.configure({
  "aws_project_region": process.env.REACT_APP_PROJECT_REGION,
  // "aws_appsync_graphqlEndpoint": process.env.REACT_APP_APPSYNC_GRAPHQLENDPOINT,
  "aws_appsync_graphqlEndpoint": "https://v2t6wol6y5eszjx22qsh4u76ki.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": process.env.REACT_APP_APPSYNC_REGION,
  "aws_appsync_authenticationType": process.env.REACT_APP_APPSYNC_AUTHENTICATIONTYPE,
  "aws_appsync_apiKey": process.env.REACT_APP_APPSYNC_APIKEY
})

async function list_projects() {
  try {
    const response = await API.graphql({
       query: allProjectsPassQuery,
       variables: {
       },
    })
    // For local testing.
    if (response.data.allProjectTasks.length === 0) {
      return [{name: "Mockproject1" , id:11}, {name: "Mockproject2", id:22}];
    }
    return response.data.allProjectsPassQuery;
  } catch (error) {
    console.error(`Cought error in function : ${error}`);
    return [{name: "Mockproject1" , id:11}, {name: "Mockproject2", id:22}];
  }
}

async function list_project_tasks(id) {
  try {
    const response = await API.graphql({
      query: allProjectTasks,
      variables: {
        projectId:id
      },
    })
    // For local testing.
    if (response.data.allProjectTasks.length === 0) {
      return [{name: "MockprojectTask101", id:101},
      {name: "MockprojectTask102", id:102}];
    }
    return response.data.allProjectTasks;
  } catch (error) {
    console.error(`Cought error in function : ${error}`);
    return [{name: "MockprojectTask101", id:101},
    {name: "MockprojectTask102", id:102}];
  }
}

function ProjectDropdown(props) {
  console.log("Renderring ProjectDropDown");

  const [selectedOption, setSelectedOption] = useState(0);

  if (Array.isArray(props.projects)) {
    if ((selectedOption === 0) && (props.projects.length > 0)) {
      setSelectedOption(props.projects[0]['id']);
    }
  }

  const handleOptionClick = (event) => {
    setSelectedOption(event.target.value);
    console.log("Setting option to : ");
    console.log(event.target.value);
    list_project_tasks(event.target.value)
      .then((project_tasks_from_async) => {
        props.setProjectTasks(project_tasks_from_async)
        }
      );
  };

  return (
      <select value={selectedOption} onChange={handleOptionClick}>
      {Array.isArray(props.projects) ? (
        props.projects.map((project, index) => (
          <option key={project.id} value={project.id} >{project.name}</option>
        ))
      ) : null}
      </select>
  );
}

function TasksSidebar(props) {
  console.log("Renderring task sidebar");
  return (
      <div>
        {props.projectTasks.map((value, index) => (
          <ListItem key={value.id} button>
          <ListItemText key={value.id} style={{ paddingLeft: 5 }}>
              <span key={value.id}>{value.name}</span>
            </ListItemText>
          </ListItem>
        ))}
      </div>
  );
}

function TaskDetails(props) {
  console.log("Renderring task details");
  return (
      <div>
        Task details will go here.
      </div>
  );
}

function Dashboard({ items, depthStep, depth }) {
  console.log("Renderring Dashboard");

  const [projects, setProjects] = useState([{name: "Mockproject1" , id:11}, {name: "Mockproject2", id:22}]);
  const [projectTasks, setProjectTasks] = useState([{name: "MockprojectTask101", id:101},
   {name: "MockprojectTask102", id:102}]);

  useEffect( () => {
    console.log("Dashboard useEffect Fetching data")
    // Loading project and sidebar for the first time.
    list_projects()
      .then((projects_from_async) => {
        setProjects(projects_from_async);
        if (projects_from_async.length > 0) {
          console.log("Project fetched. Now fetching tasks")
          list_project_tasks(projects_from_async[0].id)
            .then((project_tasks_from_async) => {
                setProjectTasks(project_tasks_from_async);
                console.log("Project Tasks fetched.")
              }
            )
            .catch((error) => {
              console.error(`Could not get Task list: ${error}`);
            });
        } else {
          console.log("Project list empty")
        }
        })
      .catch((error) => {
        console.error(`Could not get project list: ${error}`);
      });
  }, []);

  return (
    <div className="gpt3__dashboard" id="dashboard">
      <div className="gpt3__dashboard_dropdown">
        {Array.isArray(projects) ? (
          <ProjectDropdown projects={projects} setProjectTasks={setProjectTasks}/>
        ) : null}
      </div>
      <div className="gpt3__dashboard_list">
      <List disablePadding dense>
        <TasksSidebar projectTasks={projectTasks}/>
      </List>
      </div>
      <div className="gpt3__dashboard_task_details">
        <TaskDetails projectTasks={projectTasks}/>
      </div>
    </div>
  );

}

export default Dashboard