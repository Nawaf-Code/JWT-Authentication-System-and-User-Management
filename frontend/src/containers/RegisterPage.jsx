import React, {useState} from 'react';
import './RegisterPage.css';
import LoginForm from '../components/LoginForm.jsx';
// @ts-ignore
import CreateForm from '../components/CreateForm.jsx';
import EmailForm from '../components/EmailForm.jsx';
import NewPassForm from '../components/NewPassForm.jsx';


export default function RegisterPage(props) {
  const [authMode, setAuthMode] = useState(props.type)

  const handleAuthMod = (mode) => {

    setAuthMode(mode);
}

  const getAuthMode = (mode) => {
    handleAuthMod(mode)
  }
 console.log('currnet auth mode', authMode);
  const currentForm = () => {
    switch(authMode){
      case "email":
        return <EmailForm type={getAuthMode}/>
      case "create":
        return <CreateForm type={getAuthMode}/>
      case "newpass":
        return <NewPassForm/>
      default:
        return <LoginForm type={getAuthMode}/>
    }
  }
  return (
    <div className='split-screen'>

        <div className='left'>
        <section className='copy'>
          <h2>Computer Science and Information Technology College</h2>
          <p>This website was created to facilitate the management of graduation projects for students. It is specifically designed for members of the College of Computer Science and Information Technology. The website was developed by Nawaf Alzuwaymil.</p>
        </section>
      </div>

      
      <div className='right'>

            {currentForm()}
            
      </div>
    </div>
  );
};