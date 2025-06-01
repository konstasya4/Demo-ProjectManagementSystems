import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CreateRoutes } from './constants/routes';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    // <div className="App">
        
    // </div>
     <Provider store={store}>
      <CreateRoutes/>
     </Provider>
  );
}

export default App;
