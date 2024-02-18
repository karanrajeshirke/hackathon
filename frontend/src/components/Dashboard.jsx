import React from 'react';
import './Dashboard.css'; // Import CSS file for styling

const Dashboard = ({ userName, userProfilePic, userInfo }) => {
    return (
        <div className="dashboard">
            <h1 className="user-name">{userName}</h1>
            <div className="user-details">
                <div className="user-profile-pic">
                    <img src={userProfilePic} alt="User Profile" />
                </div>
                <div className="user-info">
                    <p>{userInfo}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

