import React, {useState, useEffect} from "react"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { API } from '@aws-amplify/api'
import { allProjects } from '../../graphql/queries'

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
       query: allProjects,
       variables: {
       },
    })
    return response.data.allProjects;
}

function DashboardItem({ label, items, depthStep = 10, depth = 0, ...rest }) {
  return (
    <>
      <ListItem button dense {...rest}>
        <ListItemText style={{ paddingLeft: depth * depthStep }}>
          <span>{label}</span>
        </ListItemText>
      </ListItem>
      {Array.isArray(items) ? (
        <List disablePadding dense>
          {items.map((subItem) => (
            <DashboardItem
              key={subItem.name}
              depth={depth + 1}
              depthStep={depthStep}
              {...subItem}
            />
          ))}
        </List>
      ) : null}
    </>
  )
}

function Dashboard({ items, depthStep, depth }) {
  const [projects, setProjects] = useState([]);
  useEffect( () => { 
    list_projects()
  .then((projects_from_async) => {
    setProjects(projects_from_async);
  });
  }, []);
  
  return (
    <div className="gpt3__dashboard" id="dashboard">
      <div className="gpt3__dashboard_dropdown">
        {Array.isArray(projects) ? (
        <select>
          {projects.map((projects, index) => (
            <option key={index} value={index}>{projects.name}</option>
          ))}
        </select>
        ) : null}
      </div>
      <List disablePadding dense>
        {items.map((dashboardItem, index) => (
          <DashboardItem
            key={`${dashboardItem.name}${index}`}
            depthStep={depthStep}
            depth={depth}
            {...dashboardItem}
          />
        ))}
      </List>
    </div>
  );

}

export default Dashboard