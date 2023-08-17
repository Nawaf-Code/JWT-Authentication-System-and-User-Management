import React from "react";
import { createRoot } from "react-dom/client";
import RegisterPage from "./containers/RegisterPage.jsx";
import Activate from "./containers/Activate.jsx";
import ResetPassword from "./containers/ResetPassword.jsx";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import './App.css';
// @ts-ignore
import { BrowserRouter as Router, Routes, Route, Switch} from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<RegisterPage type='login'/>} />
          <Route exact path='/create' element={<RegisterPage type='create'/>} />
          <Route exact path='/activate/:uid/:token' element={<Activate />} />
          <Route exact path='/reset-password' element={<ResetPassword />} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPassword />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
