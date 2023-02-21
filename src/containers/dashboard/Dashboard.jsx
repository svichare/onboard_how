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

function Dashboard({ items, depthStep, depth }) {
  return (
    <div className="gpt3__dashboard" id="dashboard">
      <div className="gpt3__dashboard_dropdown">
			  <select>
          <option key={1} value={1}>Backed Project (Infrastructure)</option>
          <option key={2} value={2}>Backend Project (Feature Backend)</option>
          <option key={3} value={3}>Cloud  Project</option>
			  </select>
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