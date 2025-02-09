import { useState } from 'react'
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Menu from './components/Menu/Menu';
import './App.css';

function App() {
  

  return (
    <div className="App">
      <Menu/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App
