import React, {useState} from 'react'

import {Link, Navigate} from 'react-router-dom';
// @ts-ignore
import Input from "@material-ui/core/Input";

import { connect } from 'react-redux';

import MainHeader from './MainHeader.jsx';
import { reset_password } from '../actions/auth.js';


function EmailForm(props){
    
    //const [authMode, setAuthMode] = useState('create');
    const [requestSent, setRequestSent] = useState(false);
    const [email, setEmail] = useState('');

    const onChangeData = e => setEmail(e.target.value);
    const onSubmit = e => {
        e.preventDefault();

        props.reset_password(email)
        setRequestSent(true)
    };

    const handleAuthMod = () => {
        props.type('create')
    }

    if(requestSent){
        props.type('create')
        return <Navigate to='/' />
    }
    
    return(

        <form onSubmit={e => onSubmit(e)}>
            <MainHeader/>
            <section className='copy'>
        <div className='create-form'>

                <h2 className='createword'>Rest Password</h2>
                
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
export default connect(null, {reset_password})(EmailForm)