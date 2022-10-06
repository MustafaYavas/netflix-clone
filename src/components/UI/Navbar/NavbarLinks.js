import styles from './NavbarLinks.module.css';

import { Link } from 'react-router-dom';

const NavbarLinks = () => {
    const links = [
        { title: 'Home', link: '/browse' },
        { title: 'TV Shows', link: '/tv' },
        { title: 'Movies', link: '/movies' },
        { title: 'My List', link: '/mylist' },
    ];

    return (
        <ul className={`d-flex ${styles.links}`}>
            {
                links.map((link) => (
                    <li key={link.title}>
                        <Link to={link.link}>{link.title}</Link>
                    </li>
                ))
            }
        </ul>
    )
}

export default NavbarLinks