import Header from '../../components/UI/Header/Header';
import SignupForm from '../../components/Auth/SignupForm';
import styles from './Signup.module.css';
import PageBackground from '../../components/Layout/PageBackground';

const Signup = () => {
    return (
        <PageBackground>
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
        </PageBackground>
    )
}

export default Signup;