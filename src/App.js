import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Destination from './components/Destination/Destination';
import Error from './components/Error/Error';
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext=createContext();

function App() {


  const [loggedInUser,setLoggedInUser]=useState({});

  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination/:rideType">
            <Destination />
          </PrivateRoute>
          <Route path="/error">
            <Error />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <h1 style={{color:'red',textAlign:'center'}}>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
