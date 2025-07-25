const UserProfile = () => {
    return (
        <div className="user-profile--container">
            <img src="/user.png" alt="User Avatar" className="avatar" />
            <span className="profile-dropdown--icon"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M1 1.5L5.29289 5.79289C5.68342 6.18342 6.31658 6.18342 6.70711 5.79289L11 1.5" stroke="#4D007D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg></span>
        </div>
    );
};

export default UserProfile;