import React, { useEffect, useState } from 'react';
import './App.css'

// import FirstAttempt from './pages/FirstAttempt';
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
      <div>
        <h2>Onboard.icu:</h2>
        <p>Text heavy website. Please use larger screen to access.</p>
      </div>
    );
  } else {
    return <TestSkills />;
  }
};

export default App