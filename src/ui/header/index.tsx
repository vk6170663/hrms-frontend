import '../../styles/sidebar.css';
import '../../styles/header.css';
import PageTitle from "./page-title";
import UserProfile from './user-profile';

const Header = () => {
    return (
        <header className="header sidebar-closed">
            <div className='header-container'>
                <PageTitle />
                <UserProfile />
            </div>
        </header>
    );
};

export default Header;