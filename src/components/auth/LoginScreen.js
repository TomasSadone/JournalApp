import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {

  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: 'tomas@mail.com',
    password: '123123'
  });

  const {email, password} = formValues;

  const handleLogin = (e) =>{
    e.preventDefault();
    if(isLoginValid()){
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const isLoginValid = () => {
    if (!validator.isEmail(email)) {
      return false
    } else if (password.length < 5) {
      return false
    }
    return true 
  }
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }

  return (
    <>
      <h3 className='auth__title'>Login</h3>

      <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster">

        <input
          type='text'
          placeholder='Email'
          name='email'
          className='auth__input'
          autoComplete='off'
          value={email}
          onChange={(target)=>handleInputChange(target)}
        />

        <input
          type='password'
          placeholder='Password'
          name='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />

        <button
        type='submit'
        className='btn btn-primary btn-block'
        disabled={loading}
        >
          Login
        </button>
        
        <div className='auth__social-networks'>

          <p>Login with social network</p>

          <div className="google-btn" onClick={handleGoogleLogin}>

            <div className="google-icon-wrapper">
                <img 
                  className="google-icon" 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                  alt="google button" 
                />
            </div>

            <p className="btn-text">
                <b>Sign in with google</b>
            </p>

          </div>

        </div>

        <Link
          className='link' 
          to='/auth/register'>
          Create new account
        </Link>

      </form>
    </>
  )
}
