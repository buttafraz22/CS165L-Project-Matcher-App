import Navbar from "./Navbar";
import TestimonialCard from "./TestimonialCard";
import testimonialsData from "../testimonialsData";

function Testimonials() {
    return (
        <>
            <Navbar />
            <div className="mx-3 p-5">
                <h1 className="mb-4" style={{color: "#CE5959"}}>Testimonials</h1>
                {testimonialsData.map((testimonial)=><TestimonialCard name={testimonial.name} date={testimonial.date} feedback={testimonial.feedback} />)}
                <hr className="mt-5" style={{borderTop: "2px dotted #CE5959", borderWidth: "8px", width: "10%"}}/>
            </div>
        </>
    );
}

export default Testimonials;