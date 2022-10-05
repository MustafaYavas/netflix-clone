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
        },
        setSignin(state, action) {
            state.isSignin = false;
            state.email = action.payload;
        },
        signinUser(state, action) {
            state.email = action.payload.email;
            state.movieList = action.payload.movieList;
            state.isSignin = true;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice;