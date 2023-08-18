import React, {useState} from 'react'
// @ts-ignore
import IconButton from "@material-ui/core/IconButton";
// @ts-ignore
import Visibility from "@material-ui/icons/Visibility";
// @ts-ignore
import InputAdornment from "@material-ui/core/InputAdornment";
// @ts-ignore
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Navigate} from 'react-router-dom';
// @ts-ignore
import Input from "@material-ui/core/Input";

import { connect } from 'react-redux';

import MainHeader from './MainHeader.jsx';
import { reset_password_confirm } from '../actions/auth.js';


function NewPassForm(props){
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });
    const {new_password, re_new_password} = formData;
    const onChangeData = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();

        const uid = props.match.params.uid;
        const token = props.match.params.token;
        props.reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true)
    };

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
 
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setFormData({ ...formData, password: event.target.value})
    };
    if(requestSent){
        return <Navigate to='/' />
    }
    
    return(

        <form onSubmit={e => onSubmit(e)}>
            <MainHeader/>
            <section className='copy'>
        <div className='create-form'>

                <h2 className='createword'>Rest Password</h2>
                
                <div className='form-group' >
                <Input
                    placeholder='New Password'
                    className="form-control"
                    name='new_password'
                    disableUnderline={true}
                    type={values.showPassword ? "text" : "password"}
                    onChange={handlePasswordChange("password")}
                    value={values.password}
                    endAdornment={
                        <InputAdornment position="end" >
                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    />
                </div>
                <div className='form-group' >
                    <Input
                    placeholder='Confirm New Password'
                    className="form-control"
                    name='re_new_password'
                    disableUnderline={true}
                    type={values.showPassword ? "text" : "password"}
                    onChange={handlePasswordChange("password")}
                    value={values.password}
                    endAdornment={
                        <InputAdornment position="end" >
                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    />
                </div>
                
                
               
                <button className='btnt'  style={{marginTop: 40}}>Reset Password</button>
                
            </div>

            </section>
        </form>
    )
    
}
export default connect(null, {reset_password_confirm})(NewPassForm)