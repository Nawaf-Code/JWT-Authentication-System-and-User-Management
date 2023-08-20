import React, {useState} from 'react'

import {Link, Navigate} from 'react-router-dom';
// @ts-ignore
import Input from "@material-ui/core/Input";

import { connect } from 'react-redux';
import Notification from './Notification.jsx';
import MainHeader from './MainHeader.jsx';
import { reset_password } from '../actions/auth.js';
import { check_email, re_set } from '../actions/auth.js';

function EmailForm(props){
    
    //const [authMode, setAuthMode] = useState('create');
    //const [requestSent, setRequestSent] = useState(false);
    const [email, setEmail] = useState('');

    const onChangeData = e => setEmail(e.target.value);
    
    const onSubmit = e => {
        e.preventDefault();
        props.check_email(email) 
    };

    if(props.isEmailValid){
        props.reset_password(email);
        props.type('login');
        return <Navigate to='/' />
    }
    const handleAuthMod = () => {
        props.type('create')
    }

    return(

        <form onSubmit={e => onSubmit(e)}>
            <MainHeader/>
            <section className='copy'>
        <div className='create-form'>

                <h2 className='createword'>Rest Password</h2>
                <Notification/>
                {(props.isEmailValid === false) && (
                   <h1>t</h1>
                )}
                
                <div className='form-group' >
                <p>Enter the email address associated with account and we'll send you a link to reset your password.</p>

                <div className="row" >
                    <div className="col">
                        <Input type="text" name='email' disableUnderline={true} className="form-control" placeholder="Email" onChange={e => onChangeData(e)}  />
                    </div>

                </div>
                </div>
                
                
               
                <button className='btnt'  style={{marginTop: 40}}>Continue</button>
                <p>Don't have an account? <Link onClick={() => handleAuthMod()} to="/create">Sign up</Link></p>
                
            </div>

            </section>
        </form>
    )
    
}
const mapStateToProps = state => ({
    isEmailValid: state.auth.isEmailValid
})
export default connect(mapStateToProps, {check_email,reset_password, re_set})(EmailForm)