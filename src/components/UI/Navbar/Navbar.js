import logo from '../../../assets/logo.png';
import styles from './Navbar.module.css';
import NavbarLinks from './NavbarLinks';

import { GoSearch } from 'react-icons/go';
import { IoNotifications } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsPencil, BsPerson, BsQuestionCircle } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user-slice';
import { deleteUser } from '../../../store/userApiCalls';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => window.onscroll = null;
    }

    const signoutHandler = () => {
        dispatch(userActions.signoutUser())
    }

    const deleteAccountHandler = () => {
        deleteUser(user.email, dispatch);
    }

    return (
        <div className={`${isScrolled ? `${styles.navbar} ${styles.scrolled}` : styles.navbar}`}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <img 
                        src={logo}
                        alt='logo' 
                        onClick={() => {navigate('/browse')}}
                    />
                    <div className={`${styles['nav-links']} d-none d-lg-block`}>
                        <NavbarLinks />
                    </div>

                    <div className={`${styles.browse} d-lg-none`}>
                        <div className='d-flex justify-content-center align-items-center' role='button'>
                            <p className='m-0'>Browse</p>                     
                            <IoMdArrowDropdown className={`${styles['browse-icon']} ms-1 mt-1 fs-5 `}/>
                        </div>

                        <div className={styles['browse-options']}>
                            <NavbarLinks />
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className=' d-none d-lg-block'>
                        <GoSearch className={styles.icon}/>
                        <span>Kids</span>
                        <IoNotifications className={styles.icon}/>
                    </div>

                    <div className={styles.profile}> 
                        <img 
                            src='https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' 
                            alt='pp'                      
                        />                       
                        <IoMdArrowDropdown className={styles.icon}/>
                        <div className={styles.options}>
                            <span><BsPencil className={styles['option-icons']}/>Manage Profiles</span>
                            <span><BsPerson className={styles['option-icons']}/>Account</span>
                            <span><BsQuestionCircle className={styles['option-icons']}/>Help Center</span>
                            <div>
                                <p onClick={signoutHandler}>Sign out of Netflix</p>
                                <p onClick={deleteAccountHandler}>Delete Account</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;