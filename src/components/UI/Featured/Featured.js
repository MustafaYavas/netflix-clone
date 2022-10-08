import styles from './Featured.module.css';
import hero from '../../../assets/hero.webp'
import title from '../../../assets/title1.png'

import { FaPlay } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';

const Featured = () => {
    return (
        <div className={styles.featured}>
            <img 
                src={hero} alt='featured'
            />
            <div className={styles.info}>
                <img
                    src={title}
                    alt='title'
                />
                <span className={`${styles.desc} d-none d-sm-none d-md-block`}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis provident enim dolorum recusandae natus, iure officiis laborum odit! Nisi, natus.
                </span>
                <div className={styles.buttons}>
                    <button className={styles.play}>
                        <FaPlay />
                        <span>Play</span>
                    </button>
                    <button className={styles.more}>
                        <FiInfo />
                        <span>More Info</span>
                    </button>
                </div>
            </div>
                <div className={styles.shadow}></div>

        </div>
    )
}

export default Featured;