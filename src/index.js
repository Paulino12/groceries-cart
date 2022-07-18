import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import CartContextProvider from './contexts/cartContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CartContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CartContextProvider>
  </React.StrictMode> 
);
