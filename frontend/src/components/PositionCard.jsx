import React from 'react';

const PositionCard = ({ position }) => {
    return (
        <div className="position-card">
            <h3>{position.title}</h3>
            <p>{position.description}</p>
            <div>
                <span>Requirements: {position.requirements}</span>
                <span>Experience: {position.experience}</span>
            </div>
            <button>Apply Now</button>
        </div>
    );
};

export default PositionCard;
