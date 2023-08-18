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
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import MainHeader from './MainHeader.jsx';
import { reset_password_confirm } from '../actions/auth.js';


function NewPassForm(props){
    const [requestSent, setRequestSent] = useState(false);
    const { uid, token } = useParams();
    const onSubmit = e => {
        e.preventDefault();
        props.reset_password_confirm(uid, token, values.newPassword, values.reNewPassword);
        setRequestSent(true)
    };
    const [values, setValues] = React.useState({
        newPassword: "",
        showNewPassword: false,
        reNewPassword: "",
        showReNewPassword: false,
    });
    console.log(values.newPassword, values.reNewPassword);
    const handleClickShowPassword1 = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword });
    };

    const handleClickShowPassword2 = () => {
        setValues({ ...values, showReNewPassword: !values.showReNewPassword });
    };
 
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
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
                placeholder='Password'
                name='newPassword'
                className="form-control"
                disableUnderline={true}
                type={values.showNewPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.newPassword}
                endAdornment={
                    <InputAdornment position="end" >
                        <IconButton onClick={handleClickShowPassword1} onMouseDown={handleMouseDownPassword} >
                            {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>}
                />
                </div>
                <div className="form-group">
                <Input
                placeholder="Confirm Password"
                name='reNewPassword'
                className="form-control"
                disableUnderline={true}
                type={values.showReNewPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.reNewPassword}
                endAdornment={
                    <InputAdornment position="end" >
                        <IconButton onClick={handleClickShowPassword2} onMouseDown={handleMouseDownPassword} >
                            {values.showReNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>}
                />
                </div>
                
                
               
                <button className='btnt'  style={{marginTop: 40}}>Reset Password</button>
                
            </div>

            </section>
        </form>
    )
    
}
export default connect(null, {reset_password_confirm})(NewPassForm)