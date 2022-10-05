import logo from '../../assets/logo.png';
import styles from './Header.module.css';

import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt='logo' />
            </div>
            <button onClick={() => navigate(props.login ? '/login' : '/signup')}>
                {props.login ? 'Log In' : 'Sign In'}
            </button>
        </header>
    )
}

export default Header