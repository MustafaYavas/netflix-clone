import styles from './MyList.module.css';
import Navbar from '../../components/UI/Navbar/Navbar';
import MovieCard from '../../components/UI/Card/MovieCard';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AiOutlineUndo } from 'react-icons/ai';
import { addMovie } from '../../store/userApiCalls';

const MyList = () => {
    const { movieList, email } = useSelector(state => state.user);
    const [movies, setMovies] = useState([]);
    const [isRemoved, setIsRemoved] = useState(false);
    const [removedMovie, setRemovedMovie] = useState(null);
    const [lastRemovedMovie, setLastRemovedMovie] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovies = async() => {
            let datas = [];
            for(let i=0; i<movieList.length; i++) {
                if(movieList[i] === '') continue;
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieList[i]}?api_key=2aebef63e3aa01d0a8b8c81bae93b010&language=en-US`)
                const data = await res.json();
                datas.push(data);
            }
            setMovies(datas);
        }
        getMovies();
        
    }, [movieList]);

    const showMessage = (movie, id) => {
        setIsRemoved(true);
        setRemovedMovie(movie);     // movie title
        setLastRemovedMovie(id);    // movie id

        const timer = setTimeout(() => {
            setIsRemoved(false);
        }, 5000)

        return (() => {
            clearTimeout(timer);
        })
    }

    const undoRemove = () => {
        addMovie(lastRemovedMovie, email, dispatch)
    }

    return (
        <div className={styles['my-list']}>
            <Navbar />
            <h2>My List</h2>
            <div className={styles.container}>
                {
                    movies.length !== 0  && 
                    movies.map(movie => (
                        <MovieCard 
                            key={Math.random()}
                            id={movie.id}
                            title={movie.original_title}
                            poster={movie.poster_path}
                            genres={movie.genres}
                            onShowMessage={showMessage}
                        />
                    ))
                }
            </div>

            {
                movies.length === 0 &&
                <p className='text-center text-secondary fs-4'>You haven't added any titles to your list yet.</p>
            }

            {
                isRemoved &&
                <div className={styles['remove-message']}>
                    <div>
                        <span className='fw-bolder'>{removedMovie}</span> has been removed from My List
                    </div>
                    <span 
                        className={styles['info-button']}
                        onClick={undoRemove}
                    >
                        <AiOutlineUndo /> Undo
                    </span>
                </div>
            }
        </div>  
    )
}

export default MyList