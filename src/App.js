import React from 'react'
import './App.css'

import { Dashboard, Footer, Header } from './containers';
import { Navbar } from './components';

const items = [
    { name: 'home', label: 'Home' },
    { name: 'Outdoors', label: 'Outdoors' },
  ]

const App = () => (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
        <Dashboard items={items}/>
        <Footer />
      </div>
    </div>
  );

export default App