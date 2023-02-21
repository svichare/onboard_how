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

const App = () => (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
        <Dashboard items={items} />
        <Footer />
      </div>
    </div>
  );

export default App