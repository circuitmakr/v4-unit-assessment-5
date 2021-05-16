import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav/Nav'
import Routes from './routes'




function App() {
  return (
    <HashRouter>
    <div className='App'>
    <Nav />
    {Routes}
    </div>
    </HashRouter>
  )
};

export default App;
