import styles from './SignupForm.module.css';
import { createUser } from '../../store/userApiCalls';
import { userActions } from '../../store/user-slice';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
        setError(false)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const checkUserHandler = async() => {
        if(email.length === 0) return setError(true);

        try {
            const res = await fetch('https://api.retable.io/v1/public/retable/rPLEZcXBj1IBlrXs/data', {
                method: 'GET',
                headers: {
                    'ApiKey': 'RTBLv1-OyJbLtAmvzBmntAdKvYlxvmPk'
                }
            });

            const datas = await res.json();
            datas.data.rows.forEach(row => {
                if(row.columns[2].cell_value === email) {
                    dispatch(userActions.setSignin(email))
                    return navigate('/signin');
                }
            })
            setShowPasswordInput(true);
        } catch (error) {
            console.log('Something went wrong while signing up!')
        }
        
    }

    const signupHandler = async() => {
        createUser({email, password}, dispatch)
        navigate('/browse')
    }

    return (
        <div className='container'>
            <div className={`row ${styles.form}`}>
                <input 
                    className={`${showPasswordInput ? 'col-6' : 'col-12 col-lg-9'} ${error ? styles['error-input'] : ''}`}
                    type='email' 
                    placeholder='Email address' 
                    name='email'
                    value={email}
                    onChange={emailChangeHandler}
                />

                {
                    showPasswordInput &&
                    <input 
                        className={`${showPasswordInput  ? 'col-6' : 'col-12 col-lg-9'}`}
                        type='password' 
                        placeholder='Password' 
                        name='password'
                        value={password}
                        onChange={passwordChangeHandler}
                    />
                }

                {
                    !showPasswordInput &&
                    <button 
                        className={`col-5 col-lg-3 ${styles.button}`}
                        onClick={checkUserHandler}
                    >
                        Get Started
                        <MdKeyboardArrowRight />
                    </button>
                    }
            </div>
            {
                showPasswordInput &&
                <div className='text-center mt-3'>
                    <button 
                        className={`${styles.button} py-2 px-3`}
                        onClick={signupHandler}
                    >
                        Sign Up
                    </button>
                </div>
            }
            <p 
                className={styles.error}
                style={error ? {visibility: 'visible'} : {visibility: 'hidden'}}
            >
                Email is required!
            </p>
        </div>
    )
}

export default SignupForm