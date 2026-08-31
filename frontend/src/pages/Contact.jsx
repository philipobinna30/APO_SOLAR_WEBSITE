
import { useState } from "react";
import { submitContactMessage } from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    setIsSubmitting(true);

    try {
      await submitContactMessage(formData);

      setStatus({
        type: "success",
        message:
          "Thank you. Your message has been submitted successfully. Our team will get back to you.",
      });

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to send your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="inner-page">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="page-hero">
        <div className="section-container">

          <p className="eyebrow">
            CONTACT APO SOLAR
          </p>

          <h1>
            Let's talk about your
            <span> energy needs.</span>
          </h1>

          <p>
            Have a question, need a solar inverter or want to discuss an
            installation? Our team is ready to hear from you.
          </p>

        </div>
      </section>


      {/* =====================================================
          CONTACT INFORMATION + FORM
      ===================================================== */}
      <section className="section-padding">

        <div className="section-container contact-grid">

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}
          <div className="contact-information">

            <p className="eyebrow dark">
              GET IN TOUCH
            </p>

            <h2>
              We're here to help.
            </h2>

            <p className="section-text">
              Contact APO Solar Limited to discuss your solar inverter
              requirements, installation project or renewable energy
              needs.
            </p>

            <div className="contact-details">

              {/* PHONE */}
              <div className="contact-item">

                <span>
                  PHONE
                </span>

                <a href="tel:07032245886">
                  <strong>
                    07032245886
                  </strong>
                </a>

                <a href="tel:09048174692">
                  <strong>
                    09048174692
                  </strong>
                </a>

              </div>


              {/* EMAIL */}
              <div className="contact-item">

                <span>
                  EMAIL
                </span>

                <a href="mailto:anuforophilipobinna@yahoo.com">
                  <strong>
                    anuforophilipobinna@yahoo.com
                  </strong>
                </a>

                <a href="mailto:aposolar86@yahoo.com">
                  <strong>
                    aposolar86@yahoo.com
                  </strong>
                </a>

              </div>


              {/* LOCATION */}
              <div className="contact-item">

                <span>
                  LOCATION
                </span>

                <strong>
                  Lagos, Nigeria
                </strong>

              </div>


              {/* BUSINESS HOURS */}
              <div className="contact-item">

                <span>
                  BUSINESS HOURS
                </span>

                <strong>
                  Monday – Saturday
                </strong>

              </div>

            </div>

          </div>


          {/* =================================================
              CONTACT FORM
          ================================================= */}
          <div className="contact-form-card">

            <h2>
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit}>

              {/* FULL NAME */}
              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  name="full_name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* EMAIL */}
              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* PHONE */}
              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. 08012345678"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>


              {/* SUBJECT */}
              <div className="form-group">

                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                />

              </div>


              {/* MESSAGE */}
              <div className="form-group">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>


              {/* STATUS MESSAGE */}
              {status.message && (
                <div
                  className={
                    status.type === "success"
                      ? "form-success"
                      : "form-error"
                  }
                >
                  {status.message}
                </div>
              )}


              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="primary-button"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Sending..."
                  : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="cta-section">

        <div className="section-container">

          <h2>
            Looking for a complete solar solution?
          </h2>

          <p>
            Request a personalized quotation from APO Solar Limited.
          </p>

          <a
            href="/quote"
            className="primary-button"
          >
            Request a Quote
          </a>

        </div>

      </section>

    </main>
  );
};

export default Contact;
