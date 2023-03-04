import React from 'react'
import './App.css'

import { Dashboard, Footer, Header } from './containers';
import { Navbar } from './components';


const App = () => (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </div>
  );

export default App