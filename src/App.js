import React, { useEffect, useState } from 'react';
import './App.css'

import color_logo from './assets/logo/color_logo.png'
import TestSkills from './pages/TestSkills';



const App = () =>{
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 700);
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleResize = () => {
    const width = window.innerWidth;
    console.log("Width : " + width);
    setIsLargeScreen(width >= 700);
  };

  console.log("outer Width : " + window.innerWidth);

  if (!isLargeScreen) {
    return (
      <div fontFamily="Consolas, Arial, Helvetica, sans-serif">
        <img src={color_logo} />
        <p>Text heavy website. Please use larger screen to access.</p>
        <p>Or turn your phone to landscape mode. But goodluck typing in any of the text boxes! </p>
      </div>
    );
  } else {
    return <TestSkills />;
  }
};

export default App