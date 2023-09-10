import React, {useEffect} from "react";
import { connect } from "react-redux";
import {checkAuthenticated, load_user} from '../actions/auth.js'
import HomePage from "../containers/HomePage.jsx";
import NavBar from "../components/NavBar.jsx";
const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, [])
    return(
     <>
    <NavBar/>
    <HomePage />
    </>   
    )
};

export default connect(null, {checkAuthenticated, load_user})(Layout);