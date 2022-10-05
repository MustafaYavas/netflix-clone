import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    email: '',
    movieList: []
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.movieList = action.payload.movieList;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        loginUser(state, action) {
            state.email = action.payload.email;
            state.movieList = action.payload.movieList;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice;