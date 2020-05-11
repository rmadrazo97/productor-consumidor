import React from 'react';
import logo from './logo.svg';
import './App.css';
import Productor from './components/Productor';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import Log from './components/Log';

function App() {
  return (
    <div className="" style={{ minHeight: "100vh" }}>
      <header className="">
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true" ></script>

        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossOrigin="true" ></script>

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true" ></script>
      </header>
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
        <hr></hr>
        <div className="mb-2">
          <Resources />
        </div>
        <div className="mb-2">
          <Log />
        </div>
      </div>
    </div >
  );
}

export default App;
