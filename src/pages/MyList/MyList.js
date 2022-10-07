import styles from './MyList.module.css';
import Navbar from '../../components/UI/Navbar/Navbar';
import MovieCard from '../../components/UI/Card/MovieCard';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const MyList = () => {
    const { movieList } = useSelector(state => state.user);
    const [movies, setMovies] = useState([]);

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
        
    }, [movieList])

    return (
        <div className={styles['my-list']}>
            <Navbar />
            <h2>My List</h2>
            <div className={styles.container}>
                {
                    movies.length !== 0  && 
                    movies.map((movie, i) => (
                        <MovieCard 
                            index={i}
                            key={movie.id}
                            id={movie.id}
                            poster={movie.poster_path}
                            genres={movie.genres}
                        />
                    ))
                }
            </div>

            {
                movies.length === 0 &&
                <p className='text-center text-secondary fs-4'>You haven't added ant titles to your list yet.</p>
            }
        </div>  
    )
}

export default MyList