import Button from "./button";

type LogoutType = {
    logoutShow: boolean;
    setLogoutShow: (show: boolean) => void;
    handleLogout: () => Promise<void>;
};

const Logout = ({ logoutShow, setLogoutShow = () => { }, handleLogout }: LogoutType) => {
    const handleConfirmLogout = () => {
        handleLogout().then(() => {
            setLogoutShow(false);
        });
    };

    return (
        <>
            {logoutShow && (
                <>
                    <div className="logout-overlay"></div>
                    <div className="logout-container">
                        <div className="logout-header">Logout</div>
                        <div className="logout-body">
                            <p>Are you sure you want to log out?</p>
                            <div className="logout-container--btns">
                                <Button
                                    className="logout--btn cancel--btn"
                                    onClick={() => setLogoutShow(false)}
                                >
                                    Cancel
                                </Button>
                                <Button className="logout--btn confirm--btn" onClick={handleConfirmLogout}>
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Logout;