import React, {useState} from 'react'
import IconButton from "@material-ui/core/IconButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordStrength from './PasswordStrength.jsx';
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {Navigate} from 'react-router-dom';
import Input from "@material-ui/core/Input";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import MainHeader from './MainHeader.jsx';
import { reset_password_confirm } from '../actions/auth.js';


function NewPassForm(props){
    const [text, setText ] = useState('');
    const { uid, token } = useParams();
    
    const onSubmit = e => {
        e.preventDefault();
        if(text === "good" || text === "strong"){
            if(values.newPassword === values.reNewPassword){
                props.reset_password_confirm(uid, token, values.newPassword, values.reNewPassword);
                props.type('login');
                return <Navigate to='/' />
            }else{
                passNotify();
            }
        }else{
            textnNotify();
        }
        
    };
    const [values, setValues] = React.useState({
        newPassword: "",
        showNewPassword: false,
        reNewPassword: "",
        showReNewPassword: false,
    });
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
    const getText = (currentText) =>{
        setText(currentText);
    }


    let message = `Your password ${text}, please make it stronger !`;
    const textnNotify = () =>  toast.warn(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    const passNotify = () => toast.error("Passwords does not match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        
    return(

        <form onSubmit={e => onSubmit(e)}>
            <MainHeader/>
            <section className='copy'>
        <div className='create-form'>
        
                <h2 className='createword'>Rest Password</h2>
                
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                {/* Same as */}
                <ToastContainer />
               
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
                {values.newPassword !== '' && (
                    <PasswordStrength password={values.newPassword} text={getText} />
                )}
                
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
                {((values.newPassword !== values.reNewPassword) && (values.reNewPassword !=='')) && (

                    <p style={{color: "red", marginTop:10}}>Passwords do not match.</p>
                )}
                </div>
                
                
               
                <button className='btnt'  style={{marginTop: 40}}>Reset Password</button>
                
            </div>

            </section>
        </form>
    )
    
}
export default connect(null, {reset_password_confirm})(NewPassForm)