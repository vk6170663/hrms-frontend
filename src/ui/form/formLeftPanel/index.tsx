import "../../../styles/form.css";

const FormLeftPanel = () => {
    return (
        <div className="form-left-panel">

            <div className="dashboard-preview">
                <img src="/Rectangle 77.png" className="form-left-panel-img" />
            </div>

            <div className="panel-content">
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
                <p>
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>

            <div className="panel-indicators">
                <span className="indicator active"></span>
                <span className="indicator"></span>
                <span className="indicator"></span>
            </div>
        </div>
    );
};

export default FormLeftPanel;