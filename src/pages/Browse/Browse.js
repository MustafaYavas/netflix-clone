import styles from './Browse.module.css';
import Navbar from '../../components/UI/Navbar/Navbar';
import Featured from '../../components/UI/Featured/Featured';
import List from '../../components/UI/List/List';

import { useEffect, useState } from 'react';

const Browse = () => {
    const [popularMovies, setPopularMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [playingMovies, setPlayingMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])

    useEffect(() => {
        const API_KEY = '2aebef63e3aa01d0a8b8c81bae93b010';
        const getMovies = async() => {
            const popular = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const popularDatas = await popular.json();
            setPopularMovies(popularDatas.results.slice(0,10));
            
            const top = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
            const topDatas = await top.json();
            setTopRatedMovies(topDatas.results.slice(0,10));
            
            const playing = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
            const playingDatas = await playing.json();
            setPlayingMovies(playingDatas.results.slice(0,10));
            
            const upcoming = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
            const upcomingDatas = await upcoming.json();
            setUpcomingMovies(upcomingDatas.results.slice(0,10));
        }
        getMovies();
    }, [])
    
    return (
        <div className={styles.browse}>
            <Navbar />
            <Featured />
            <List movies={popularMovies} title={'Top 10 Movies'}/>
            <List movies={topRatedMovies} title={'Trending Now'}/>
            <List movies={playingMovies} title={'New Releases'}/>
            <List movies={upcomingMovies} title={'Only on Netflix'}/>
        </div>
    )
}

export default Browse;