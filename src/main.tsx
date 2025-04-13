
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { register } from './serviceWorkerRegistration';

// Make sure React is properly available
const root = createRoot(document.getElementById("root")!);
root.render(<React.StrictMode><App /></React.StrictMode>);

// Register the service worker
register();
