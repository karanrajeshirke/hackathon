import React from 'react';
import './AboutUs.css'; // Import your CSS file for styling
import Layout from './Layout/Layout';
import ClubDisplay from './ClubDisplay';
import PositionDisplay from './PositionClub';

const AboutUs = () => {
    return (
        <Layout>
            <section id="about-us" className="section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="chalkboard-card">
                            <div className="card-content">
                                <div className="chalk-font">
                                    <h2 className={'text-center'}>About Us</h2>
                                    <p>
                                        Welcome to CampuzCons! At CampuzCons, we're dedicated to providing a seamless platform for college communities to thrive. Whether you're a student looking to explore new opportunities, a club seeking enthusiastic volunteers, or a mentor eager to share your expertise, we've got you covered.
                                    </p>
                                    <p>
                                        Our mission is to foster meaningful connections within college communities, empower individuals to discover their passions, and facilitate collaboration to drive positive change.
                                    </p>
                                    <p>
                                        With CampuzCons, you can:
                                    </p>
                                    <ul>
                                        <li>Discover Exciting Opportunities</li>
                                        <li>Connect with Like-Minded Peers</li>
                                        <li>Contribute to Campus Life</li>
                                        <li>Access Mentorship and Guidance</li>
                                    </ul>
                                    <p>
                                        Join us in building vibrant and inclusive college communities where everyone has the opportunity to grow, learn, and thrive!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <ClubDisplay/>
        <PositionDisplay/>
        </Layout>
    );
};

export default AboutUs;
