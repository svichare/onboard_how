import React from 'react'
import './App.css'

import { Dashboard, Footer, Header } from './containers';
import { Navbar } from './components';

const items = [
    { name: 'home', label: 'Home' },
    {
      name: 'billing',
      label: 'Billing',
      items: [
        { name: 'statements', label: 'Statements' },
        { name: 'reports', label: 'Reports' },
      ],
    },
    {
      name: 'settings',
      label: 'Settings',
      items: [
        { name: 'profile', label: 'Profile' },
        { name: 'insurance', label: 'Insurance' },
        {
          name: 'notifications',
          label: 'Notifications',
          items: [
            { name: 'email', label: 'Email' },
            {
              name: 'desktop',
              label: 'Desktop',
              items: [
                { name: 'schedule', label: 'Schedule' },
                { name: 'frequency', label: 'Frequency' },
              ],
            },
            { name: 'sms', label: 'SMS' },
          ],
        },
      ],
    },
  ]

  const projects = [
    { name: 'First_project_from_array', label: 'first_p' },
    { name: 'Second_project_from_array', label: 'second_p' }
  ]

const App = () => (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
        <Dashboard items={items} projects={projects}/>
        <Footer />
      </div>
    </div>
  );

export default App