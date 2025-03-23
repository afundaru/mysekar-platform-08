
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { register } from './serviceWorkerRegistration';

// Create the root and render the app - Add error handling for initial render
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found in the document');

const root = ReactDOM.createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} catch (error) {
  console.error('Failed to render application:', error);
  // Fallback render for critical errors
  rootElement.innerHTML = '<div style="padding: 20px; text-align: center;"><h2>Something went wrong</h2><p>Please try reloading the page</p></div>';
}

// Register service worker for PWA functionality in production only
register({
  onSuccess: () => console.log('Service worker registration successful'),
  onUpdate: () => console.log('New content is available, please refresh'),
});
