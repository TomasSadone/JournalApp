import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch()
  const {msgError} = useSelector( state =>state.ui)

  const [formValues, handleInputChange]= useForm({
    name:'',
    email:'',
    password:'',
    password2:''
  });

  const {name, email, password, password2} = formValues;

  const handleRegister = (e) =>{
    e.preventDefault()
    if (isFormValid()){
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0 ){
      dispatch(setError('Debe ingresar un nombre'))
      return false
  } else if (!validator.isEmail(email)) {
      dispatch(setError('Debe ingresar un mail valido'))
      return false
  } else if (password.length < 5) {
    dispatch(setError('La contraseña debe tener al menos 6 caracteres'))
    return false
  } else if (password !== password2){
    dispatch(setError('Las contraseñas no coinciden'))
    return false
  }
  dispatch(removeError())
  return true
  }

  return (
    <>
      <h3 className='auth__title'>Register</h3>

      <form onSubmit={(e)=>handleRegister(e)}>

        {
          msgError &&
            (
              <div className='auth__alert-error'>
                {msgError}
              </div>
            )
        }

      <input
          type='text'
          placeholder='Name'
          name='name'
          className='auth__input'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />

        <input
          type='text'
          placeholder='Email'
          name='email'
          className='auth__input'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />

        <input
          type='password'
          placeholder='Password'
          name='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />
        
        <input
          type='password'
          placeholder='Confirm password'
          name='password2'
          className='auth__input'
          value={password2}
          onChange={handleInputChange}
        />


        <button
        type='submit'
        className='btn btn-primary btn-block'
        >
          Register
        </button>

        <Link
          className='link mt-5' 
          to='/auth/login'> 
          Already Registred?
        </Link>

      </form>
    </>
  )
}
