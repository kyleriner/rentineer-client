import React from 'react';
import './App.css';
import AuthBox from './auth/authBox';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MainContainer from './main/MainContainer'
import Profile from './main/Profile'


function App() {
  const loginStatus = useSelector(state => state)


  return (
    <Router>
      <Switch>
        <Route exact path='/' component={loginStatus ? MainContainer : AuthBox}></Route>
        <Route path='/profile' component={loginStatus ? Profile : AuthBox}></Route>
      </Switch >
    </Router>
  )
}

export default App;
