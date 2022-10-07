import PageBackground from '../../components/Layout/PageBackground';
import Header from '../../components/UI/Header/Header';
import styles from './Signin.module.css';
import SigninForm from '../../components/Auth/SigninForm';

const Signin = () => {
    return (
        <PageBackground>
            <div className={styles.content}>
                <Header />
                <SigninForm />
            </div>
        </PageBackground>
    )
}

export default Signin;