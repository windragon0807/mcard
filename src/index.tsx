import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import globalStyles from './styles/globalStyles';
import { AlertContextProvider } from '@contexts/AlertContext';
import AuthGuard from '@components/auth/AuthGuard';

const client = new QueryClient({
  defaultOptions: {},
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <AlertContextProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </AlertContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

reportWebVitals();
