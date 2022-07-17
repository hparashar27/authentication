import classes from './ProfileForm.module.css';

import {useRef} from 'react';

const ProfileForm = () => {
  const newPasswordInputRef  = useRef();

const EnteredNewPassword = newPasswordInputRef.current.value;

  const submitHandler = (event) => {
    event.preventDefault();
  }
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
