import styles from './List.module.css';
import ListItem from './ListItem';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useRef, useState } from 'react';

const List = (props) => {   
    const [slideNumber, setSlideNumber] = useState(false);
    const [isMoved, setIsMoved] = useState(false);
    const listRef = useRef();

    const clickArrowHandler = (dir) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if(dir === 'back' && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if(dir === 'forward' && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    }
    
    return (
        <div className={styles.list}>
            <span className={styles['list-title']}>{props.title}</span>
            <div className={styles.wrapper}>
                {
                    isMoved &&
                    <IoIosArrowBack 
                        className={`${styles['slider-icon']} ${styles.back}`} 
                        onClick={() => clickArrowHandler('back')}
                    />
                }
                <div className={styles.container} ref={listRef}>
                    {
                        props.movies.map((movie, i) => (
                            <ListItem 
                                index={i}
                                key={movie.id}
                                id={movie.id}
                                poster={movie.poster_path}
                            />
                        ))
                    }
                </div>
                <IoIosArrowForward 
                    className={`${styles['slider-icon']} ${styles.forward}`} 
                    onClick={() => clickArrowHandler('forward')}
                />
            </div>
        </div>
    )
}

export default List