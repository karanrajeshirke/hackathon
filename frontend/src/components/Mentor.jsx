import React, { useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import axios from "axios";

const Mentor = () => {
  const [allFieldsDetails, setAllFieldsDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fields = await fetchFields();
      const fieldsDetails = await fetchMentorsForFields(fields);
      setAllFieldsDetails(fieldsDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFields = async () => {
    const response = await axios.get("http://localhost:3000/general/fields");
    return [...new Set(response.data.clubs.map((item) => item._id))];
  };

  const fetchMentorsForFields = async (fields) => {
    const mentorsPromises = fields.map(async (id) => {
      const response = await axios.get(`http://localhost:3000/general/mentors/${id}`);
      return response.data.mentors;
    });
    return Promise.all(mentorsPromises);
  };

  return (
    <Layout>
      <h1>Mentor Page</h1>
      {JSON.stringify(allFieldsDetails.length)}
      <div className="row">
        {allFieldsDetails.map((fieldMentors, index) => (
          <div key={index} className="col-6 mentor-field">
            {fieldMentors.map((mentor, mentorIndex) => (
              <div key={mentorIndex} className="mentor">
                <p>{mentor.name}</p>
                {/* Render other mentor details here */}
                <hr className="mentor-line" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Mentor;
