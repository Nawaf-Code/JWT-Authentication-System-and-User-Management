import React, {useState, useEffect} from 'react';
import { motion } from "framer-motion";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import {Link, Navigate} from 'react-router-dom';
import { StageSpinner } from "react-spinners-kit";
import MainHeader from './MainHeader.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import {create_user, re_set_state} from '../actions/auth.js';
import PasswordStrength from './PasswordStrength.jsx';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from "react-top-loading-bar";


function CreateForm(props){

    const [selectedRole, setSelectedRole] = useState([])
    const [selectState, setSelectedState] = useState(false);
    const [isVerified, setIsVerified ] = useState(false);
    const [isCodeSent, setCodeStatus] = useState(false)
    const [code, setCode] = useState('');
    const [text, setText ] = useState('');
    const [load, setLoad ] = useState(false);
    const [userEmail, setUserEmail ] = useState('');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: 'Na1na1na1',
        re_password: 'Na1na1na1',
        major: '',
        role: '',
        gender_or_superFor: '',
        isLeader: false
    });


    const [state, setState] = useState({
        loadingBarProgress: 0
    })
    const loadingBarProgress = state
    const onLoaderFinished = () => {
        setState({ loadingBarProgress: 0 });
      };
    const complete = () => {
        setState({ loadingBarProgress: 100 });
      };
    const add = (value) => {
        setState({loadingBarProgress: state.loadingBarProgress+value})
    }
    const {
        first_name ,last_name ,
        username ,
        password ,re_password ,
        major ,role ,
        gender_or_superFor,
        isLeader } = formData;

    const onChangeData = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const variants = {
        hidden: { opacity: 0, x: '300%' },
        visible: { opacity: 1, x: 0 },
    };
    
    const roles = [
        {value: 'STUDENT', text: 'Student'},
        {value: 'SUPERVISOR', text: 'Supervisor'},
      ];

    const SUPERVISOR = [
        {value: 'none', text: 'Supervisor for...', disabled: true},
        {value: 'MALES', text: 'Males'},
        {value: 'FEMALES', text: 'Females'},
        {value: 'MALES_FEMALES', text: 'Males and Females'},
    ]

    const STUDENT = [
        {value: 'none', text: 'Gender...', disabled: true},
        {value: 'MALE', text: 'Male'},
        {value: 'FEMALE', text: 'Female'},
    ]

    const majors = [
        {value: 'CS', text: 'CS'},
        {value: 'IS', text: 'IS'},
        {value: 'CN', text: 'CN'},
        {value: 'CE', text: 'CE'},
    ]

    let message = `Your password is ${text}, please make it stronger !`;
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
    
    const [values, setValues] = React.useState({
        newPassword: "",
        showNewPassword: false,
        reNewPassword: "",
        showReNewPassword: false,
    });
    const getText = (currentText) =>{
        setText(currentText);
    }
    const handlePasswordChange1 = (prop) => (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setFormData({ ...formData, password: e.target.value})
    };

    const handlePasswordChange2 = (prop) => (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setFormData({ ...formData, re_password: e.target.value})
    };

    const handleClickShowPassword1 = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword });
    };

    const handleClickShowPassword2 = () => {
        setValues({ ...values, showReNewPassword: !values.showReNewPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleAuthMod = () => {
        props.type('login')
    };

    function handleSelectChange(e){
        setSelectedRole(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value})
        setSelectedState(true)
    };
    const handleCheckBox = () => {
        setFormData({ ...formData, isLeader: !isLeader});
    }
    const onSubmit = e =>{
        e.preventDefault();
        if(text === "good" || text === "strong" || 1==1){
            if(values.newPassword === values.reNewPassword){
                setLoad(!load)
                add(47)
                const email = formData.role === "SUPERVISOR" ? formData.username+"@kfu.edu.sa" : formData.username+"@student.kfu.edu.sa";
                setUserEmail(email)
                props.create_user(formData);
            }else{
                passNotify();
            }
        }else{
            textnNotify();
        }
    }

    useEffect(() => {
        if (props.isSignUpSuccess) {
            complete();
            console.log('isSignUpSuccess');
            setIsVerified(true);
            props.re_set_state();
        }
    }, [props.isSignUpSuccess]);

    const timeExpiration = () =>{
        const now = new Date();
        const hours = now.getHours()+1;
        const hours12 = hours % 12 || 12;
        const minutes = now.getMinutes();
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const AM_PM = hours < 12? 'AM':'PM'
        const time = `${hours12}:${formattedMinutes} ${AM_PM}`
        return time
    }
    return(

        <form onSubmit={e => onSubmit(e)}>
            <LoadingBar
          progress={state.loadingBarProgress}
          height={5}
          color="green"
          onLoaderFinished={() => onLoaderFinished()}
        />
            <MainHeader/>
            <section className='copy'>
        <div className='create-form'>

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

                <div className='move'>
                <div className='forms-container'>
                    {!isVerified && (<motion.div className='createInputs'
                    variants={variants}
                    initial='visible'
                    animate={isVerified ? 'hidden' : 'visible'}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='createword'>Create Account</h2>
                    <div className='form-group' >
                    <div className="form-row" >
                        <div className="col">
                            <Input type="text" disableUnderline={true} className="form-control" name='first_name' value={first_name} onChange={e => onChangeData(e)} placeholder="First name" required/>
                        </div>
                        <div className="col">
                            <Input type="text" disableUnderline={true} className="form-control" name='last_name' value={last_name} onChange={e => onChangeData(e)}  placeholder="Last name" required />
                        </div>
                    </div>
                    </div>
                    <div className="form-group"> <Input className="form-control" type="text" name="username" value={username} disableUnderline={true} onChange={e => onChangeData(e)}  placeholder="KFU Id" required /></div>
                    <div className="form-group">
                    <Input
                    placeholder='Password'
                    
                    name='newPassword'
                    className="form-control"
                    disableUnderline={true}
                    type={values.showNewPassword ? "text" : "password"}
                    onChange={handlePasswordChange1("password")}
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
                    onChange={handlePasswordChange2("password")}
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
    
                    <div className="form-group">
                    <div className='form-row' >
                        <div className='col'>
                            <select name="major" className="custom-select" onChange={e => onChangeData(e)} required>
                            <option value="" >
                            Select a Major...
                        </option>
                        {majors.map(option => (
                        <option key={option.value} value={option.value} >
                            {option.text}
                        </option>
                        ))}
                        </select>
                        </div>
                        
                    </div>
                    </div>
    
    
                    <div className="form-group">
                    <div className='form-row' >
    
                        <div className='col mb-3'>
                            <select name="role" className="custom-select" id="validationCustom04" onChange={e => handleSelectChange(e)} required>
                        <option value="" >
                            Select a Role...
                        </option>
                        {roles.map(option => (
                        <option key={option.value} value={option.value} >
                            {option.text}
                        </option>
                        ))}
                        </select>
                        </div>
    
    
                        <div className='col mb-3'>
                        <select defaultValue="" name='gender_or_superFor' className="custom-select" disabled={selectState ? false : true} onChange={e => onChangeData(e)} > 
                        {// @ts-ignore
                        (selectedRole !== 'SUPERVISOR' && selectedRole !== 'STUDENT') && (
                        <option value="" disabled >
                            ...
                        </option>
                        )}
                        {(
                        // @ts-ignore
                        selectedRole === 'STUDENT' ? STUDENT : SUPERVISOR).map(option => (
                        <option key={option.value} value={option.value} required>
                            {option.text}
                        </option>
                        ))}
                    </select>
                        </div>
    
    
    
                    </div>
                    </div>
                    
                    {(
                        // @ts-ignore
                        selectedRole === 'STUDENT')&&(
                            <div className="form-group">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="invalidCheck" name="isLeader" onChange={handleCheckBox}/>
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                    Set me as a leader
                                    </label>
                                </div>
                            </div>
                        )}
                   
                    <button className='btnt' disabled={load} >create</button>
                    <p>Already have account? <Link onClick={() => handleAuthMod()} to="/">Sign in</Link></p>
                    <hr style={{ marginTop: '50px', borderCollapse:'collapse'}}/>
                <div>
                <p style={{textAlign: 'center'}}>By creating an account you agree to College <Link href="">Terms of Service</Link> and <Link href="">Privacy Policy.</Link></p>
                </div>
                    </motion.div>)}
                

                    {isVerified && (<motion.div 
                    className='verficatioCode'
                    variants={variants}
                    initial='hidden'
                    animate={!isVerified ? 'hidden' : 'visible'}
                    transition={{ duration: 0.5 }}
                >
                    <div className='create-form'>

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover={false}
                            theme="light"
                        />

                        <h2 className='createword'>Verify Email</h2>
                        <div className='form-group' >
                        <p style={{marginBottom:1}}>We just sent your authentication code to {userEmail}.</p>
                        <p style={{marginTop: 0}}>The code will expire at {timeExpiration()} +03.</p>
                        
                        {props.isOtpSent ? (
                        <>
                        <div className="row" >
                            <div className="col">
                                <Input type="text" name='email' disableUnderline={true} className="form-control" placeholder="XXXXXX"  />
                                
                            </div>

                        </div>
                        <div style={{textAlign:'center', marginTop:10 }}>
                                    <button class="resendbtn">Resend code</button>
                                </div>
                        



                        <button className='btnt' disabled={!code} style={{marginTop: 25}}>Continue</button>
                        </>
                        ):(
                        <div className="spinner-container">
                            <StageSpinner size={35} color="#2e4c68" backColor="#2e4c68" frontColor="#2e4c68" loading={true} />
                        </div>)}
                        </div>
                        
                        </div>

                        </motion.div>)}
                    

                </div>
                
            </div>
            </div>
            </section>
        </form>
    )
    
}
const mapStateToProps = state => ({
    isSignUpSuccess: state.auth.isSignUpSuccess,
    isOtpSent: state.auth.isOtpSent
})
export default connect(mapStateToProps, {create_user, re_set_state})(CreateForm)