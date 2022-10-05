import Browse from './pages/Browse';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';

import { Navigate, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to='/signup' />} />
            <Route path='/browse' element={<Browse />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/signin' element={<Signin />}/>
        </Routes>
    )
}

export default App;