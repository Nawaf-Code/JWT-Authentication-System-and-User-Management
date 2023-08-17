import React, {useState} from 'react';
import './RegisterPage.css';
import MainHeader from '../components/MainHeader.jsx';
import LoginForm from '../components/LoginForm.jsx';
import CreateForm from '../components/createForm.jsx';


export default function RegisterPage(props) {
  const [authMode, setAuthMode] = useState(props.type)

  const handleAuthMod = () => {
    authMode == 'login' ? setAuthMode('create') : setAuthMode('login');
}

  const getAuthMode = (mode) => {
    handleAuthMod()
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

            {authMode == 'login' ? (
              <LoginForm type={getAuthMode}/>
            ):(
              <CreateForm type={getAuthMode}/>
            )}
            
      </div>
    </div>
  );
};