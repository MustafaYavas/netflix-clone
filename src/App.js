import Browse from './pages/Browse';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';

import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
    const user = useSelector(state => state.user);

    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/signup' />} />
            <Route path='/browse' element={user.email ? <Browse /> : <Navigate replace to='/signup'/>}/>
            <Route path='/signup' element={!user.isSignin ? <Signup /> : <Navigate replace to='/browse'/>}/>
            <Route path='/signin' element={!user.isSignin ? <Signin /> : <Navigate replace to='/browse'/>}/>
        </Routes>
    )
}

export default App;