/*
  TestimonialCard Component

  This component represents a card displaying user testimonials. It takes in the name,
  date, and feedback as props and renders them in a structured format.

  Dependencies:
  - React: Core library for building UI components.
*/

// Importing necessary dependencies
import React from "react";

// TestimonialCard Component definition
function TestimonialCard(props) {
    // Rendered JSX for the TestimonialCard component
    return (
        <div className="my-3 testimonial-card">
            {/* Displaying the name and date */}
            <p className="pl-3 py-2">{props.name}, {props.date}</p>
            {/* Displaying the user's feedback */}
            <p className="px-3 py-0 text-justify">{props.feedback}</p>
        </div>
    );
}

// Export the TestimonialCard component
export default TestimonialCard;