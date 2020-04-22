import React from 'react';
import logo from './logo.svg';
import './App.css';
import Productor from './components/Productor';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="" style={{ minHeight: "100vh" }}>
      <header className="">
        <div>
          <div className="mb-2">
            <Dashboard />
          </div>
          <div className="mb-2">
            <Productor />
          </div>
          <div className="mb-2">
            <Productor />
          </div>
        </div>
      </header>
    </div >
  );
}

export default App;
