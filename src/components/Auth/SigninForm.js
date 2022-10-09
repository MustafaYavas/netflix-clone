import styles from './SinginForm.module.css';
import { userActions } from '../../store/user-slice';
import Spinner from '../UI/LoadingSpinner/Spinner';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bcrypt from 'bcryptjs';

const SigninForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState('');
    const [emailEmptyWarn, setEmailEmptyWarn] = useState(false);
    const [passwordEmptyWarn, setPasswordEmptyWarn] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
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

    const signinHandler = async() => {
        setErrorMessage(null)
        if(email.length === 0) setEmailEmptyWarn(true);
        if(password.length === 0) setPasswordEmptyWarn(true);
        
        let userInfos = null;
        let userList = null;
        setIsLoading(true);
        try {
            const res = await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
                method: 'GET',
                headers: {
                    'ApiKey': process.env.REACT_APP_DB_KEY
                }
            });
    
            const datas = await res.json();
        
            datas.data.rows.forEach(row => {
                if(row.columns[2].cell_value === email) {
                    userInfos = row;
                    userList = row.columns[0].cell_value.split(',')
                }    
            })

            if(userInfos === null) throw new Error('Wrong email!');
            
            let isValidPassword = false;
            try {
                isValidPassword = await bcrypt.compare(password, userInfos.columns[1].cell_value);
            } catch (error) {
                throw new Error('Could not log you in. Please check your credentials and try again!')
            }

            if(!isValidPassword) throw new Error('Could not log you in. Invalid credentials!');
            

            const authExpDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
            
            if(userInfos !== null) {
                dispatch(userActions.signinUser({
                    email: userInfos.columns[2].cell_value,
                    movieList: userList,
                    expDate: authExpDate
                }));
            }
            
            localStorage.setItem('userData', JSON.stringify(
                {
                    user: userInfos.columns[2].cell_value,
                    movieList: userList,
                    expiration: authExpDate.toISOString()
                }
            ));
            navigate('/browse');
        } catch (error) {
            if(error.message === 'Wrong password!') {
                setErrorMessage(
                    <>
                        <span className='fw-bolder'>Incorrect password. </span> 
                        Please try again or you can &nbsp;
                        <span className='text-decoration-underline'>reset your password.</span>
                    </>
                )
            } else {
                setErrorMessage(
                    <>
                        <span>
                            Sorry, we can't find an account with this email address. Please try again or &nbsp;
                        </span> 
                        <span 
                            className='text-decoration-underline'
                            role='button'
                            onClick={() => { navigate('/signup') }}
                        >
                            create a new account
                        </span>
                    </>
                )
            }   
            setIsLoading(false);         
        }
        setIsLoading(false);
    }

    const navigateHandler = () => {
        navigate('/signup');
    }

    return (
        <div className={styles.container}>
            <h2>Sign In</h2>

            <div className={styles.form}>
                {
                    errorMessage &&
                    <div className={styles.error}>
                        { errorMessage }
                    </div>
                }
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
                        style={passwordEmptyWarn ? {visibility: 'visible'} : {visibility: 'hidden'}}
                    >
                        Your password must contain between 4 and 60 characters.
                    </p>
                }

                <button 
                    className={styles.button}
                    onClick={signinHandler}
                >
                    { isLoading ? <Spinner /> : 'Sign In'}
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

export default SigninForm;