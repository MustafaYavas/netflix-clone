import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    email: null,
    movieList: [],
    isSignin: false,
    expDate: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {    // to create a new user
            state.email = action.payload.email;
            state.movieList = action.payload.movieList;
            state.isSignin = true;
            state.expDate = action.payload.authExpDate;
        },
        setSignin(state, action) {  // Used to autocomplete the e-mail part on the sign-in page
            state.isSignin = false;
            state.email = action.payload;
        },
        signinUser(state, action) {
            state.email = action.payload.email;
            state.movieList = action.payload.movieList;
            state.isSignin = true;
            state.expDate = action.payload.authExpDate;
        },
        signoutUser(state) {
            state.email = null;
            state.movieList = [];
            state.isSignin = false;
            state.expDate = null;
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