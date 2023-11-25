import Navbar from "../components/Navbar";
import React from "react";
import '../App.css'

function About() {
    return (
        <>
            <div className="about mx-3 p-5">
                <h1 className="mb-4" style={{color: "#CE5959"}}>About</h1>
                <p className="text-justify mb-5">The website for the proposed halal matchmaking mobile application introduces users to a comprehensive platform facilitating secure and personalized matchmaking. With a user-friendly registration and authentication process, individuals can create accounts, log in securely, and benefit from password reset and recovery mechanisms. The platform incorporates role-based management, allowing users to manage profiles as partners or parents, and supports various matching preferences. Features include a sophisticated matchmaking system, chat support with multimedia capabilities, voice and video calls, gamification for icebreaking, and privacy measures such as an anonymous system for law enforcement contacts. The website emphasizes security, privacy, and accessibility, ensuring compliance with relevant standards, and offers a seamless user experience with scalability to accommodate a growing user base. Overall, the site aims to provide a holistic and user-centric approach to halal matchmaking, catering to diverse user preferences and ensuring a safe and enjoyable experience.</p>
                <hr style={{borderTop: "2px dotted #CE5959", borderWidth: "8px", width: "10%"}}/>
            </div>
        </>
    );
}

export default About;