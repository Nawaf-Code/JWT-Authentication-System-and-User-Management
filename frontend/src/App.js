import React from "react";
import RegisterPage from "./containers/RegisterPage.jsx";
import HomePage from "./containers/HomePage.jsx";
import Activate from "./containers/Activate.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import './App.css';

import Layout from "./hooks/layout.js";
// @ts-ignore
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Layout/>} />
          <Route exact path='/login' element={<RegisterPage type='login'/>} />
          <Route exact path='/create' element={<RegisterPage type='create'/>} />
          <Route exact path='/reset-password' element={<RegisterPage type='email'/>} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<RegisterPage type='newpass'/>} />
          <Route exact path='/activate/:uid/:token' element={<Activate />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
