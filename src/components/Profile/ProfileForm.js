import classes from './ProfileForm.module.css';
import {useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/Auth-context';

const ProfileForm = () => {
  const newPasswordInputRef  = useRef();
 const authCtx = useContext(AuthContext);
const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
const EnteredNewPassword = newPasswordInputRef.current.value();
 

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAHqYycrlxkKtuxqQ2O2zODAqmNwmGiiIw',{
    method : 'POST',
    body :JSON.stringify({
      idToken : authCtx.Token,
      password: EnteredNewPassword,
      returnSecureToken : true 
    }),
    headers : {
      'Content-Type' : 'application/json' 
    }
    }).then( res => {
history.replace('/');
    })
  }
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password'  minLength='7' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
