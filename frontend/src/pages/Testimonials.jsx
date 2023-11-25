import Navbar from "../components/Navbar";
import TestimonialCard from "../components/TestimonialCard";
import testimonialsData from "../testimonialsData";
import React from "react";
import "../App.css"

function Testimonials() {
    return (
        <>
            <div className="testimonials test mx-3 p-5">
                <h1 className="mb-4" style={{color: "#CE5959"}}>Testimonials</h1>
                {testimonialsData.map((testimonial)=><TestimonialCard name={testimonial.name} date={testimonial.date} feedback={testimonial.feedback} />)}
                <hr className="mt-5" style={{borderTop: "2px dotted #CE5959", borderWidth: "8px", width: "10%"}}/>
            </div>
        </>
    );
}

export default Testimonials;