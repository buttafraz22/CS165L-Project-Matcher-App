import React from "react";

function TestimonialCard(props) {
    return (
        <div className="my-3 testimonial-card">
            <p className="pl-3 py-2">{props.name}, {props.date}</p>
            <p className="px-3 py-0 text-justify">{props.feedback}</p>
        </div>
    );
}

export default TestimonialCard;