import { QueryClientProvider } from '@tanstack/react-query';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { initConfig } from 'config/initConfig';
import ReactModal from 'react-modal';
import App from './App';

import './index.css';

const config = initConfig();
const appElement = document.getElementById('root')!;
ReactModal.setAppElement(appElement);

createRoot(appElement).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <BrowserRouter>
        <QueryClientProvider client={config.queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </PrimeReactProvider>
  </StrictMode>
);
