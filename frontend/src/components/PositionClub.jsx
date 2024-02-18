import React, { useEffect, useState } from "react";
import axios from "axios";

const PositionDisplay = () => {
  const [clubData, setClubData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const getAllClubs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/general/fields");
      setClubData(response.data.clubs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClubs();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? clubData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === clubData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <h1 className="text-center">ALL POSITIONS</h1>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {clubData.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {clubData.map((club, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeIndex ? "active" : ""
              }`}
            >
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
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
          onClick={handlePrev}
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
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
          onClick={handleNext}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default PositionDisplay;
