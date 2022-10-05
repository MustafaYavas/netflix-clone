import { useSelector } from 'react-redux';

const Browse = () => {
    const user = useSelector(state => state.user);

    console.log(user)

    return (
        <div>Browse</div>
    )
}

export default Browse;