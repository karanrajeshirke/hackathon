import React from 'react';

const ClubCard = ({ club }) => {
    return (
        <div className="club-card">
            <img src={club.logo} alt={club.name} />
            <h2>{club.name}</h2>
            {/* one liner description */}
            <p>{club.description}</p>
            <button>View Details</button>
        </div>
    );
};

export default ClubCard;