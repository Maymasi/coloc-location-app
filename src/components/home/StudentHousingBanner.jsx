import React from 'react';
import { Sparkles } from 'lucide-react';
export default function StudentHousingBanner () {
    return (
        <section className="student-housing-banner">
        <div className="banner-content" data-aos="fade-right">
            <span className="limited-offer">
            <Sparkles size={"16px"}/>
            Limited Time Offer
            </span>
            <h1>
            Ready to Find Your Perfect Student <br /> Housing?
            </h1>
            <p>
            Join thousands of students who have found their ideal accommodations and roommates with CampusHaven. 
            Sign up today and get 50% off your first month's rent!
            </p>
        </div>
        <div className="banner-buttons" data-aos="fade-left">
            <button className="btn-primary">Sign Up Now</button>
            <button className="btn-secondary">Browse Properties</button>
        </div>
        </section>
    );
}

