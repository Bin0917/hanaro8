import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { CounterProvider } from './hooks/CounterContext.tsx';
import './index.css';
import Snowfall from 'react-snowfall';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Snowfall />
    <CounterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CounterProvider>
  </StrictMode>
);
