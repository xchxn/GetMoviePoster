import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/AppRouter';
import Navbar from './components/Header/Navbar';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <AppRouter />
    </div>
  );
}

export default App;
