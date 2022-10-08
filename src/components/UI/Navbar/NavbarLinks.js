import { useNavigate } from 'react-router-dom';

const NavbarLinks = () => {
    const navigate = useNavigate();

    return (
        <>
            <span onClick={() => { navigate('/browse') }}>Home</span>
            <span>TV Shows</span>
            <span>Movies</span>
            <span onClick={() => { navigate('/browse/my-list') }}>My List</span>
        </>
    )
}

export default NavbarLinks