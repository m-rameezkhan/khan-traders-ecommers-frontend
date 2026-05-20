import React, { useState } from "react";
import {
  IoMailOutline,
  IoPhonePortraitOutline,
  IoLocationOutline,
  IoChatbubbleEllipsesOutline
} from "react-icons/io5";
import { buildApiUrl } from "../../utils/apiConfig";
import "./styles/contactus.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

const ContactUs = () => {
  const [formData, setFormData] = useState(initialForm);
  const [formStatus, setFormStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus("");

    try {
      const response = await fetch(buildApiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send your message.");
      }

      setFormStatus("success");
      setFormData(initialForm);
    } catch (error) {
      setFormStatus(error.message || "Unable to send your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-kicker">Contact Khan Traders</span>
          <h1>Get In Touch</h1>
          <p>Questions about products, orders, or support? Send a message and our team will respond as soon as possible.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info-panel">
              <h2>Contact Information</h2>
              <p>Reach us through the channel that is easiest for you.</p>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon"><IoLocationOutline /></div>
                  <div className="info-content">
                    <h3>Address</h3>
                    <p>Khan Traders Headquarters<br />Karachi, Pakistan</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon"><IoPhonePortraitOutline /></div>
                  <div className="info-content">
                    <h3>Phone</h3>
                    <p>+92 (XXX) XXX-XXXX<br />Available Mon-Fri, 9AM-6PM</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon"><IoMailOutline /></div>
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>support@khantraders.com<br />info@khantraders.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon"><IoChatbubbleEllipsesOutline /></div>
                  <div className="info-content">
                    <h3>Support</h3>
                    <p>Order help, product questions, and service requests.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-panel">
              <h2>Send Us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" required />
                </div>

                {formStatus && (
                  <div className={`form-status ${formStatus === "success" ? "success" : "error"}`}>
                    {formStatus === "success" ? "Message sent successfully. We will get back to you soon." : formStatus}
                  </div>
                )}

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <p className="form-note">* Required fields</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section muted-bg">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How long does delivery take?</h3>
              <p>Delivery timing depends on product availability and order location. Our team confirms details after checkout.</p>
            </div>
            <div className="faq-item">
              <h3>Can I track my order?</h3>
              <p>Logged-in customers can view order updates from their orders page.</p>
            </div>
            <div className="faq-item">
              <h3>Do you support bulk orders?</h3>
              <p>Yes. Send your product requirements through the contact form and we will follow up.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
