import styles from './Featured.module.css';
import home from '../../../assets/home2.jpg'
import title from '../../../assets/title2.png'

import { FaPlay } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';

const Featured = () => {
    return (
        <div className={styles.featured}>
            <img 
                src={home} alt='featured' 
            />
            <div className={styles.info}>
                <img
                    src={title}
                    alt='title'
                />
                <span className={styles.desc}>
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
        </div>
    )
}

export default Featured