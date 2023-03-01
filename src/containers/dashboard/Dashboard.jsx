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

function Dashboard({ items, depthStep, depth }) {
  const [projects, setProjects] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  useEffect( () => { 
    list_projects()
  .then((projects_from_async) => {
    setProjects(projects_from_async);
    list_project_tasks(projects_from_async[0].id)
      .then((project_tasks_from_async) => {
          setProjectTasks(project_tasks_from_async);
        }
      );
  });
  }, []);
  
  return (
    <div className="gpt3__dashboard" id="dashboard">
      <div className="gpt3__dashboard_dropdown">
        {Array.isArray(projects) ? (
        <select>
          {projects.map((projects, index) => (
            <option key={index} value={index}>{projects.name}</option>
            // Update the lists when the dropdown is updated.
          ))}
        </select>
        ) : null}
      </div>
      <List disablePadding dense>
          {projectTasks.map((dashboardItem, index) => (
            <ListItem button>
            <ListItemText style={{ paddingLeft: depth * depthStep }}>
              <span>{dashboardItem.name}</span>
            </ListItemText>
          </ListItem>
          ))}
      </List>
    </div>
  );

}

export default Dashboard