import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import './dashboard.css';

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

function Dashboard({ items, projects, depthStep, depth }) {
  return (
    <div className="gpt3__dashboard" id="dashboard">
      <div className="gpt3__dashboard_dropdown">
			  
        {Array.isArray(projects) ? (
        <select>
          {projects.map((project, index) => (
            <option key={index} value={index}>{project.name}</option>
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
  )
}

export default Dashboard