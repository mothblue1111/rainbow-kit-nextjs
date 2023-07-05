"use client";

import { useEffect } from 'react';

const ApplyCustomFont = (): null => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @font-face {
        font-family: 'Bluu';
        src: url('../fonts/BluuNext-master/Fonts/webfonts/bluunext-bold.ttf') format('truetype');
        // font-weight: bold;
        // font-style: bold;
        /* Add additional font files if needed for different formats */
        /* Specify font-weight and font-style if required */
      }
      body {
        font-family: 'Bluu';
        /* Other styles for the body */
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default ApplyCustomFont;
//ApplyCustomFont component is defined as a function component that returns null. 
//This allows it to be used as a JSX component without causing any type errors.