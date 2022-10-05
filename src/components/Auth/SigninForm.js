import styles from './SinginForm.module.css';
import { signinUser } from '../../store/userApiCalls';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SigninForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState('');
    const [emailEmptyWarn, setEmailEmptyWarn] = useState(false);
    const [passwordEmptyWarn, setPasswordEmptyWarn] = useState(false);
    
    const changeEmailHandler = (e) => {
        if(e.target.value.length === 0) setEmailEmptyWarn(true)
        else setEmailEmptyWarn(false);
        setEmail(e.target.value);
    }

    const changePasswordHandler = (e) => {
        if(e.target.value.length === 0) setPasswordEmptyWarn(true)
        else setPasswordEmptyWarn(false);
        setPassword(e.target.value);
    }

    const signinHandler = () => {
        if(email.length === 0) setEmailEmptyWarn(true);
        if(password.length === 0) setPasswordEmptyWarn(true);

        signinUser({ email }, dispatch)

        navigate('/browse');
    }

    const navigateHandler = () => {
        navigate('/signup')
    }

    return (
        <div className={styles.container}>
            <h2>Sign In</h2>

            <div className={styles.form}>
                <input 
                    className={`${emailEmptyWarn ? styles['warn-input'] : ''}`}
                    type='text' 
                    placeholder='Email or phone number' 
                    name='email'
                    value={email}
                    onChange={changeEmailHandler}
                />
                {
                    emailEmptyWarn &&
                    <p 
                        className={styles.warn}
                        style={emailEmptyWarn ? {visibility: 'visible'} : {visibility: 'hidden'}}
                    >
                        Please enter a valid email or phone number.
                    </p>
                }

                <input 
                    className={`${passwordEmptyWarn ? styles['warn-input'] : ''}`}
                    type='password' 
                    placeholder='Password' 
                    name='password'
                    value={password}
                    onChange={changePasswordHandler}
                />

                {   passwordEmptyWarn &&
                    <p 
                        className={styles.warn}
                        style={emailEmptyWarn ? {visibility: 'visible'} : {visibility: 'hidden'}}
                    >
                        Your password must contain between 4 and 60 characters.
                    </p>
                }

                <button 
                    className={styles.button}
                    onClick={signinHandler}
                >
                    Sign In
                </button>
            </div>

            <div className={styles.options}>
                <div className={styles['options__checkbox']}>
                    <input type='checkbox' id='remember' name='remember' value='false' />
                    <p>Remember me</p>
                </div>

                <a href='https://www.netflix.com/tr-en/LoginHelp'>Need help?</a>
            </div>

            <div className={styles.link}>
                <p>New to Netflix?</p>
                <button onClick={navigateHandler}>Sign up now.</button>
            </div>

            <div className={styles.info}>
                This page is protected by Google reCAPTCHA to ensure you're not a bot. 
                <span> Learn more.</span>
            </div>
        </div>
    )
}

export default SigninForm