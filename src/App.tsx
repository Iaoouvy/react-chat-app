import React from 'react';
import { Provider } from 'react-redux'

import './App.css';
import store from './redux/store'

import User from './components/User';
import Chat from './components/Chat'

function App() {
  
  return (
    <Provider store={store}>
      <div className='flex flex-row h-screen text-blue-900 bg-gray-100'>
        <User />
      </div>
    </Provider>
  );
}

export default App;
