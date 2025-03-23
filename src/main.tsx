
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { register } from './serviceWorkerRegistration';

// Create the root and render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register service worker for PWA functionality in production only
register({
  onSuccess: () => console.log('Service worker registration successful'),
  onUpdate: () => console.log('New content is available, please refresh'),
});
