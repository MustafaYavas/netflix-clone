import Header from '../../components/Auth/Header';
import SignupForm from '../../components/Auth/SignupForm';
import styles from './Signup.module.css';

const Signup = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header />
                <div className={styles.wrapper}>
                    <div className={styles.headers}>
                        <h1>Unlimited movies, TV shows, and more.</h1>
                        <h3>Watch anywhere. Cancel anytime.</h3>
                        <h5>Ready to watch? Enter your email to create or restart your membership.</h5>
                    </div>

                    <SignupForm />
                    
                </div>
            </div>
        </div>
    )
}

export default Signup;