import styles from './ListItem.module.css';

import { BsFillPlayCircleFill } from 'react-icons/bs';
import { IoMdAddCircle } from 'react-icons/io';
import { BiLike, BiDislike } from 'react-icons/bi';
import { useState } from 'react';

const ListItem = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const addToListHandler = () => {
        console.log(props)
    }

    return (
        <div 
            className={styles['list-item']} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            style={{left: isHovered && props.index * 225 - 50 + props.index * 2.5 }}
        >
            <img 
                src={`https://www.themoviedb.org/t/p/original/${props.poster}`} alt='card' 
            />
            { isHovered && 
                <>
                    <div className={styles['item-info']}>
                        <div className={styles.icons}>
                            <BsFillPlayCircleFill className={styles.icon}/>
                            <IoMdAddCircle className={styles.icon} onClick={addToListHandler}/>
                            <BiLike className={styles.icon}/>
                            <BiDislike className={styles.icon}/>
                        </div>
                        <div className={styles['item-info-top']}>
                            <span>1h 23m</span>
                            <span className={styles.limit}>13+</span>
                        </div>
                        <div className={styles.genres}>
                            <span>Suspenseful &#x2022;</span>
                            <span>Exciting &#x2022;</span>
                            <span>Thriller</span>
                        </div>
                    </div>
                </>
            }
            
        </div>
    )
}

export default ListItem