import { useState, useRef ,useContext} from 'react';
import AuthContext from '../../store/Auth-context';
import classes from './AuthForm.module.css';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
const [IsLoading,setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory(); 

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
   
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation
    setIsLoading(true)
    let url ;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHqYycrlxkKtuxqQ2O2zODAqmNwmGiiIw'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHqYycrlxkKtuxqQ2O2zODAqmNwmGiiIw'
    }
    fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
      let errormessage = ' Authentication Failed ! ';
      // if(data && data.error && data.error.message){
      //    errormessage = data.error.message ;
      // } 
      alert(errormessage)
      throw new Error(errormessage);
        });
      }
    }).then((data)=>{
authCtx.login(data.idToken);
history.replace('/');
    }).catch((err)=>{
      alert(err.message)
    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!IsLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {IsLoading && <p className={classes.loading}>loading ......</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;