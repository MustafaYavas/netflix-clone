import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    email: null,
    movieList: [],
    isSignin: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.movieList = action.payload.movieList;
            state.isSignin = true;
        },
        setSignin(state, action) {
            state.isSignin = false;
            state.email = action.payload;
        },
        signinUser(state, action) {
            state.email = action.payload.email;
            state.movieList = action.payload.movieList;
            state.isSignin = true;
        },
        signoutUser(state) {
            state.email = null;
            state.movieList = [];
            state.isSignin = false;
        },
        addMovieToList(state, action) {
            const movieId = action.payload;
            const isExist = state.movieList.find((item) => (item === movieId));

            if(!isExist) state.movieList.push(movieId);            
        },
        removeMovieFromList(state, action) {
            const movieId = action.payload;
            const newList = state.movieList.filter(item => (item !== movieId))
            state.movieList = newList;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice;