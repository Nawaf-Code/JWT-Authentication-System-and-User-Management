import React, {useState} from 'react';
import { motion } from "framer-motion";
import { ToastContainer } from 'react-toastify';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import {Link} from 'react-router-dom';
import { StageSpinner } from "react-spinners-kit";
import MainHeader from './MainHeader.jsx';


export default function CreateForm(props){

    const [selectedRole, setSelectedRole] = useState([])
    const [selectState, setSelectedState] = useState(false)
    const [isVerified, setIsVerified ] = useState(false);
    const [isCodeSent, setCodeStatus] = useState(false)
    const [code, setCode] = useState('')

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        kfu_id: '',
        password: '',
        re_password: '',
        major: '',
        role: '',
        gender_or_superFor: '',
        isLeader: false
    });
    const {
        first_name ,last_name ,
        kfu_id ,
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

    const [values, setValues] = React.useState({
        newPassword: "",
        showNewPassword: false,
        reNewPassword: "",
        showReNewPassword: false,
    });

    const handlePasswordChange = (prop) => (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
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

    function handleSelectChange(event){
        setSelectedRole(event.target.value);
        setSelectedState(true)
    };

    const onSubmit = e =>{
        e.preventDefault()
        /*props.create(
            first_name ,last_name ,
            kfu_id ,
            password ,re_password ,
            major ,role ,
            gender_or_superFor,
            isLeader
        );*/
        //setIsVerified(!isVerified)
    }
    let email = 'na6016na@gmail.com';

    return(

        <form onSubmit={e => onSubmit(e)}>
            <MainHeader/>
            <section className='copy'>
        <div className='create-form'>

                
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
                            <Input type="text" disableUnderline={true} className="form-control" placeholder="First name" />
                        </div>
                        <div className="col">
                            <Input type="text" disableUnderline={true} className="form-control" placeholder="Last name" />
                        </div>
                    </div>
                    </div>
                    <div className="form-group"> <Input className="form-control" type="text" disableUnderline={true} name="uid" placeholder="KFU Id" /></div>
                    <div className="form-group">
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
    
                    <div className="form-group">
                    <div className='form-row' >
                        <div className='col'>
                            <select name="" className="custom-select">
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
                            <select name="" className="custom-select" id="validationCustom04" onChange={handleSelectChange}>
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
                        <select defaultValue="" className="custom-select" disabled={selectState ? false : true}> 
                        {// @ts-ignore
                        (selectedRole !== 'SUPERVISOR' && selectedRole !== 'STUDENT') && (
                        <option value="" disabled>
                            ...
                        </option>
                        )}
                        {(
                        // @ts-ignore
                        selectedRole === 'STUDENT' ? STUDENT : SUPERVISOR).map(option => (
                        <option key={option.value} value={option.value}>
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
                                    <input type="checkbox" className="form-check-input" id="invalidCheck" />
                                    <label className="form-check-label" for="invalidCheck">
                                    Set me as a leader
                                    </label>
                                </div>
                            </div>
                        )}
                   
                    <button className='btnt' >create</button>
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
                        <p style={{marginBottom:1}}>We just sent your authentication code to {email}.</p>
                        <p style={{marginTop: 0}}>The code will expire at 6:08AM +03.</p>
                        
                        {isCodeSent ? (
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