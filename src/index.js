import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StudygroupsContextProvider } from './context/StudygroupContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StudygroupsContextProvider>
    <App />
    </StudygroupsContextProvider>
  </React.StrictMode>
);