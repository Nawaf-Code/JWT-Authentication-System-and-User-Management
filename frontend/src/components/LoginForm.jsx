import React, {useState} from 'react'
// @ts-ignore
import IconButton from "@material-ui/core/IconButton";
// @ts-ignore
import Visibility from "@material-ui/icons/Visibility";
// @ts-ignore
import InputAdornment from "@material-ui/core/InputAdornment";
// @ts-ignore
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// @ts-ignore
import Input from "@material-ui/core/Input";
// @ts-ignore
import {Link, Navigate} from 'react-router-dom';
import MainHeader from './MainHeader.jsx';
import { login } from '../actions/auth.js';
// @ts-ignore
import { connect } from 'react-redux';
function MainForm(props) {

    const [authMode, setAuthMode] = useState('login')
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const {username, password } = formData;
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    const onChangeData = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        props.login(username, password)
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
 
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

        console.log('isEmailValid',props.isEmailValid);
    
    
    if(props.isAuthenticated){
        return <Navigate to='/' />
    }
    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setFormData({ ...formData, password: event.target.value})
    };

    const handleAuthMod = (mode) => {
        props.type(mode)
    }
    
  return (

        <form onSubmit={e => onSubmit(e)}>
            <MainHeader/>
            <section className='copy'>
            <div className='login-form'>

                <h2 className='loginword'>Login</h2>

                <div className='login-container'>
                    <p>Are you new user? <Link onClick={() => handleAuthMod("create")} to="/create">Sign up</Link></p>
                </div>
                
                <div className="form-group"><Input className="form-control" type="text" name="username" value={username} onChange={e => onChangeData(e)} disableUnderline={true} placeholder="KFU ID" /></div>

                <div className="form-group">

                    <Input
                    placeholder='Password'
                    className="form-control"
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

                        <div className='container' style={{paddingLeft: 0}}>
                            <div className='div2'>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                            </div>
                            <Link onClick={() => handleAuthMod("email")} to="/reset-password">Forgot Password?</Link>
                        </div>
                </div>
                <button className='btnt' type='submit'>Login</button>

            </div>
            </section>
        </form>
  )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isEmailValid: state.auth.isEmailValid
})
export default connect(mapStateToProps, {login})(MainForm)