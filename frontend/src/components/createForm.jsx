import React, {useState} from 'react'

// @ts-ignore
import IconButton from "@material-ui/core/IconButton";
// @ts-ignore
// @ts-ignore
import Visibility from "@material-ui/icons/Visibility";
// @ts-ignore
import InputAdornment from "@material-ui/core/InputAdornment";
// @ts-ignore
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// @ts-ignore
import Input from "@material-ui/core/Input";
// @ts-ignore
import {Link, Redirect} from 'react-router-dom';
import MainHeader from './MainHeader.jsx';


export default function CreateForm(props){

    const [selectedRole, setSelectedRole] = useState([])
    const [selectState, setSelectedState] = useState(false)
    const [authMode, setAuthMode] = useState('create')

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
        password: "",
        showPassword: false,
    });

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleAuthMod = () => {
        props.type(authMode)
    }

    function handleSelectChange(event){
        setSelectedRole(event.target.value);
        setSelectedState(true)
    };
    
    return(

        <form action="">
            <MainHeader/>
            <section className='copy'>
        <div className='create-form'>

                <h2 className='createword'>Create Account</h2>
                
                <div className='form-group' >
                <div className="row" >
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
                name='pass'
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
                    </InputAdornment>}
                />
                </div>
                <div className="form-group">
                <Input
                placeholder="Confirm Password"
                name='pass'
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
                    </InputAdornment>}
                />
                </div>

                <div className="form-group">
                <div className='form-row' >
                    <div className='col'>
                        <select name="" class="custom-select">
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
                        <select name="" class="custom-select" id="validationCustom04" onChange={handleSelectChange}>
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
                    <select defaultValue="" class="custom-select" disabled={selectState ? false : true}> 
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
                        <div class="form-group">
                            <div class="form-check">
                                <input type="checkbox" className="form-check-input" id="invalidCheck" />
                                <label class="form-check-label" for="invalidCheck">
                                Set Me as a Leader
                                </label>
                            </div>
                        </div>
                    )}
               
                <button className='btnt' >create</button>
                <p>Already have account? <Link onClick={() => handleAuthMod()} to="/">Login Here</Link></p>
                
                <hr style={{ marginTop: '50px', borderCollapse:'collapse'}}/>
                <div>
                <p style={{textAlign: 'center'}}>By creating an account you agree to College <a href="">Terms of Service</a> and <a href="">Privacy Policy.</a></p>
                </div>
            </div>

            </section>
        </form>
    )
    
}