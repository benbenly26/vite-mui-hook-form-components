import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <Toaster position="top-center" richColors duration={3000} />
    </div>
    <RouterProvider router={router} />
  </React.StrictMode>
);
