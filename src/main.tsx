
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { toast } from 'sonner';

// Make sure we're using the correct element for mounting
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id "root" in your HTML file.');
}

// Create root outside of render to help with debugging
const root = ReactDOM.createRoot(rootElement);

// Mount the application with StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Register service worker for offline support
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log('Service Worker: Registered successfully');
  },
  onUpdate: () => {
    toast.info('Aplikasi telah diperbarui. Silakan refresh halaman untuk melihat versi terbaru.');
  },
  onOffline: () => {
    toast.warning('Anda sedang offline. Beberapa fitur mungkin tidak tersedia.');
  },
  onOnline: () => {
    toast.success('Anda kembali online.');
  }
});
