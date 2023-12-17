/*
  Testimonials Component

  This component displays a list of testimonials using the TestimonialCard component.
  It fetches data from testimonialsData and maps through each testimonial to render TestimonialCard.

  Dependencies:
  - React: Core library for building UI components.
  - TestimonialCard: Custom component to display individual testimonials.
  - testimonialsData: External data file containing testimonials.
*/

import TestimonialCard from "../components/TestimonialCard";
import testimonialsData from "../testimonialsData";
import React from "react";
import "../App.css";

function Testimonials() {
    // Rendered JSX for Testimonials component
    return (
        <>
            {/* Testimonials Container */}
            <div className="testimonials test mx-3 p-5">
                {/* Section Title */}
                <h1 className="mb-4" style={{color: "#CE5959"}}>Testimonials</h1>

                {/* Testimonial Cards */}
                {testimonialsData.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.id}
                        name={testimonial.name}
                        date={testimonial.date}
                        feedback={testimonial.feedback}
                    />
                ))}

                {/* Horizontal Line */}
                <hr className="mt-5" style={{borderTop: "2px dotted #CE5959", borderWidth: "8px", width: "10%"}}/>
            </div>
        </>
    );
}

export default Testimonials;