import React, { useEffect, useState } from "react";
import ClubCard from "./ClubCard";
import axios from "axios";
import cors from "cors";
import { useNavigate } from "react-router-dom";
const ClubDisplay = ({ clubs }) => {
  const [clubData, setClubData] = useState([]);
const navigate=useNavigate()
  const getAllClubs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/general/clubs");
      console.log(response.data.clubs);
      setClubData(response.data.clubs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClubs();
  }, []);

  return (
    <>
      <h1 className="text-center">ALL CLUBS</h1>
      <div className="d-flex flex-row">
        {clubData &&
          clubData.map((club, index) => (
            <div key={index} className="carousel-container">
              <div
                id={`carouselExampleCaptions${index}`}
                className="carousel slide"
                data-bs-ride="carousel"
              >
                {/* while hovering there should be pointing cursor */}
                <div className="carousel-inner" onClick={()=>navigate(`/club/${club._id}`)}>
                  <div className="carousel-item active">
                    <img
                      src="https://media.licdn.com/dms/image/D4E03AQEGpJMmu4BxQw/profile-displayphoto-shrink_400_400/0/1693294938093?e=1714003200&v=beta&t=3hMoPFdbVcKmWtzn63mT7J5gNUi-mheJeqpznlG4lXI"
                      className="d-block w-100 img-fluid h-25"
                      alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>{club.name}</h5>
                      <p>{club.description}</p>
                    </div>
                  </div>
                  {/* Add more carousel items here if needed */}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#carouselExampleCaptions${index}`}
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carouselExampleCaptions${index}`}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ClubDisplay;
