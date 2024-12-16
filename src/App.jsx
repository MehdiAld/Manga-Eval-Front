import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import ToastProvider from './components/ToastProvider';

function App() {
  return (
    <>
      <div className="main-content">
        <Outlet />
      </div>
      <ToastProvider />
    </>
  );
}

export default App;
