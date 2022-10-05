import Browse from './pages/Browse';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login';

import { Navigate, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/signup' />} />
            <Route path='/browse' element={<Browse />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/login' element={<Login />}/>
        </Routes>
    )
}

export default App;