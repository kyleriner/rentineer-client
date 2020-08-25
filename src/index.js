import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

export const login = () => {
  return {
    type: 'LOGIN'
  }
}


export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}


const auth = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
    default:
      return false;
  }
}



let store = createStore(auth)

if (localStorage.userToken) {
  store.dispatch(login())
} else {
  store.dispatch(logout())
}

export default login;



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
