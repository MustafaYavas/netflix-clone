import styles from './PageBackground.module.css';

const PageBackground = (props) => {
    return (
        <div className={styles.container}>
            { props.children }
        </div>
    )
}

export default PageBackground