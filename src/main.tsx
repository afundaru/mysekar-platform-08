
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { toast } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
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
