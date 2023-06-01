import React from "react";

import { Dashboard, Footer, Header } from '../containers';
import { Navbar } from '../components';


export default function FirstAttempt() {
  return (
      <div className="gradient__bg">
        <Navbar />
        <Header />
        <Dashboard />
        <Footer />
      </div>
  );
}