import Browse from './pages/Browse/Browse';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import MyList from './pages/MyList/MyList';
import { userActions } from './store/user-slice';

import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

let logoutTimer;
const App = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // useEffect(() => {   // If the expiration date has not expired, let the user sign in
    //     const datas = JSON.parse(localStorage.getItem('userData'));
    //     console.log(datas)
    //     if(datas && datas.user && new Date(datas.expiration) > new Date()) {
    //         dispatch(userActions.signinUser({
    //             email: datas.user,
    //             movieList: datas.movieList,
    //             expDate: new Date(datas.expiration)
    //         }));
    //     }
    // }, [dispatch]);

    // useEffect(() => {   // sign out after expiration date
    //     if(user.email && user.expDate){
    //         const remainingTime = user.expDate.getTime() - new Date().getTime();
    //         logoutTimer = setTimeout(() => {
    //             dispatch(userActions.signoutUser());
    //             navigate('/signup')
    //         }, [remainingTime])
    //     } else {
    //         clearTimeout(logoutTimer);
    //     }
    // }, [user.email, dispatch, user.expDate, navigate]);

    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/signup' />} />
            <Route path='/browse' element={user.email ? <Browse /> : <Navigate replace to='/signup'/>}/>
            <Route path='/browse/my-list' element={user.email ? <MyList /> : <Navigate replace to='/signup'/>}/>
            <Route path='/signup' element={!user.isSignin ? <Signup /> : <Navigate replace to='/browse'/>}/>
            <Route path='/signin' element={!user.isSignin ? <Signin /> : <Navigate replace to='/browse'/>}/>
        </Routes>
    )
}

export default App;