import React, { useState, useEffect } from "react";
import { IoStarOutline, IoStar, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { buildApiUrl } from "../../utils/apiConfig";
import "./styles/testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(buildApiUrl("/api/testimonials"));
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          setTestimonials(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (loading || testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];
  const initials = currentTestimonial.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <p className="section-subtitle">Verified feedback from Khan Traders customers</p>

        <div className="testimonial-carousel">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="reviewer-info">
                <div className="avatar">{initials || "KT"}</div>
                <div>
                  <h3>{currentTestimonial.name}</h3>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">
                        {i < (currentTestimonial.rating || 5) ? <IoStar /> : <IoStarOutline />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="review-text">"{currentTestimonial.message}"</p>
          </div>

          {testimonials.length > 1 && (
            <div className="carousel-controls">
              <button onClick={handlePrev} className="carousel-btn" aria-label="Previous testimonial">
                <IoChevronBack />
              </button>
              <div className="indicators">
                {testimonials.map((testimonial, idx) => (
                  <button
                    key={testimonial._id || idx}
                    className={`indicator ${idx === currentIndex ? "active" : ""}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <button onClick={handleNext} className="carousel-btn" aria-label="Next testimonial">
                <IoChevronForward />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
