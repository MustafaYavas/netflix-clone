import styles from './MovieCard.module.css';

import { useState } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import { BiLike, BiDislike } from 'react-icons/bi';
import ReactTooltip from 'react-tooltip';

const MovieCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const removeToListHandler = () => {

    }

    return (
        <div 
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={`https://www.themoviedb.org/t/p/original/${props.poster}`} alt='' />
            {
                isHovered &&
                <div className={styles.info}>
                    <div className={styles.icons}>
                        <div>
                            <BsFillPlayCircleFill className={styles.icon}/>
                            <TiTick className={styles.icon} onClick={removeToListHandler}  data-tip data-for='tooltip'/>
                            <ReactTooltip id='tooltip' place='top' effect='solid'>
                                Remove from My List
                            </ReactTooltip>
                        </div>
                        <div>
                            <BiLike className={styles.icon}/>
                            <BiDislike className={styles.icon}/>
                        </div>
                    </div>
                    <div className={styles.genres}>
                        {
                            props.genres.map((genre, i) => (
                                <span> {i>0 ? <span>&nbsp; &#x2022; &nbsp;</span> : ''} {genre.name} </span>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
        
    )
}

export default MovieCard