import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Events from "./components/Events";
import Mentor from "./components/Mentor.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ClubProfile from "./components/ClubProfile.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AboutUs />} />
          <Route path="/club/:clubId" element={<ClubProfile />} />
          <Route path="/mentors" element={<Mentor />} />
        </Routes>
      </BrowserRouter>
    </div>

    // <div className="app-container">
    //     {loading ? (
    //         <div className="loading-screen">
    //             <h1>Loading...</h1>
    //             {/* Add loading animation or spinner here */}
    //         {/* https://ant.design/components/spin  */}
    //         </div>
    //     ) : (
    //         <>
    //             <NavBar />
    //             <BrowserRouter>
    //             <Routes>
    //                 <Route path="/events" Component={Events} />
    //                 <Route path="/mentors" Component={Mentor}/>
    //                 <Route path="/dashboard" Component={Dashboard}/>
    //             </Routes>
    //             </BrowserRouter>
    //             <main>
    //                 <AboutUs />
    //                 {/*<ClubDisplay/>*/}
    //                 {/*<PositionDisplay/>*/}
    //             </main>
    //             <Footer />
    //         </>
    //     )}
    // </div>
  );
}

export default App;
