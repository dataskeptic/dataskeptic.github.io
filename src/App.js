import React from "react";
import {FaTwitter, FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa"
import {IconContext} from "react-icons"


import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="image">
        <img src={process.env.PUBLIC_URL + '/me.jpg'} /> 
        </div>
          <h1>I'm a software developer</h1>
          
          <IconContext.Provider value={{ style: { hover: 'blue', fontSize: '5vh'}}}>
          <nav>
            <a href="https://github.com/fullpistoladev" target="_blank" ><FaGithub /></a>
            <a href="https://www.linkedin.com/in/mathenrifs" target="_blank"><FaLinkedinIn /></a>
            <a href="https://twitter.com/Fullpistoladev" target="_blank"><FaTwitter /></a>
            <a><FaEnvelope /></a>
       </nav>
      </IconContext.Provider>
            {/* <li><button><i className="btn fab fa-github-square"></i></button></li>
            <li><i className="fab fa-linkedin"></i></li>
            <li><i className="fab fa-twitter-square"></i></li>
            <li><i className="fas fa-envelope-square"></i></li> */}
         
      </div>
    </div>
  );
}

export default App;