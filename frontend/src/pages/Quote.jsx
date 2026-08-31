
import { useState } from "react";
import { submitQuoteRequest } from "../services/api";

const Quote = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    property_type: "",
    service: "",
    budget: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await submitQuoteRequest({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        property_type: formData.property_type || null,
        service: formData.service,
        budget: formData.budget || null,
        location: formData.location || null,
        message: formData.message || null,
      });

      setSuccessMessage(
        "Thank you. Your quote request has been submitted successfully. Our team will contact you shortly."
      );

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        property_type: "",
        service: "",
        budget: "",
        location: "",
        message: "",
      });
    } catch (error) {
      setErrorMessage(
        error.message ||
          "Unable to submit your quote request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="inner-page">

      {/* HERO */}
      <section className="page-hero">

        <div className="section-container">

          <p className="eyebrow">
            REQUEST A QUOTE
          </p>

          <h1>
            Let's find the right
            <span> solar solution for you.</span>
          </h1>

          <p>
            Tell us about your energy requirements and we'll help you
            determine the right solution.
          </p>

        </div>

      </section>


      {/* QUOTE FORM */}
      <section className="section-padding">

        <div className="section-container quote-layout">

          {/* INTRODUCTION */}
          <div className="quote-intro">

            <p className="eyebrow dark">
              GET STARTED
            </p>

            <h2>
              Tell us what you need.
            </h2>

            <p className="section-text">
              The information you provide will help us understand your
              requirements and recommend an appropriate solar inverter
              solution.
            </p>

            <div className="quote-benefits">

              <div>
                <strong>01</strong>
                <span>Share your requirements</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Receive a recommendation</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Discuss installation</span>
              </div>

            </div>

          </div>


          {/* QUOTE FORM */}
          <div className="quote-form-card">

            {successMessage && (
              <div className="form-success">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="form-error">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* FULL NAME */}
              <div className="form-group">

                <label htmlFor="quote-name">
                  Full Name
                </label>

                <input
                  id="quote-name"
                  name="full_name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />

              </div>


              {/* EMAIL + PHONE */}
              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="quote-email">
                    Email
                  </label>

                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="quote-phone">
                    Phone
                  </label>

                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />

                </div>

              </div>


              {/* PROPERTY TYPE */}
              <div className="form-group">

                <label htmlFor="property">
                  Property Type
                </label>

                <select
                  id="property"
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  required
                >

                  <option value="" disabled>
                    Select property type
                  </option>

                  <option value="residential">
                    Residential
                  </option>

                  <option value="commercial">
                    Commercial
                  </option>

                  <option value="office">
                    Office
                  </option>

                  <option value="shop">
                    Shop
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>


              {/* SERVICE */}
              <div className="form-group">

                <label htmlFor="solution">
                  What do you need?
                </label>

                <select
                  id="solution"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >

                  <option value="" disabled>
                    Select a service
                  </option>

                  <option value="inverter">
                    Solar Inverter
                  </option>

                  <option value="installation">
                    Installation
                  </option>

                  <option value="maintenance">
                    Maintenance
                  </option>

                  <option value="upgrade">
                    System Upgrade
                  </option>

                  <option value="consultation">
                    Consultation
                  </option>

                </select>

              </div>


              {/* BUDGET */}
              <div className="form-group">

                <label htmlFor="budget">
                  Estimated Budget
                </label>

                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                >

                  <option value="" disabled>
                    Select budget range
                  </option>

                  <option value="Under ₦1,000,000">
                    Under ₦1,000,000
                  </option>

                  <option value="₦1,000,000 – ₦3,000,000">
                    ₦1,000,000 – ₦3,000,000
                  </option>

                  <option value="₦3,000,000 – ₦5,000,000">
                    ₦3,000,000 – ₦5,000,000
                  </option>

                  <option value="₦5,000,000+">
                    ₦5,000,000+
                  </option>

                  <option value="I'm not sure">
                    I'm not sure
                  </option>

                </select>

              </div>


              {/* LOCATION */}
              <div className="form-group">

                <label htmlFor="quote-location">
                  Location
                </label>

                <input
                  id="quote-location"
                  name="location"
                  type="text"
                  placeholder="City / State"
                  value={formData.location}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                />

              </div>


              {/* MESSAGE */}
              <div className="form-group">

                <label htmlFor="quote-message">
                  Tell Us More
                </label>

                <textarea
                  id="quote-message"
                  name="message"
                  rows="6"
                  placeholder="Tell us about your appliances, power requirements or project..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

              </div>


              {/* SUBMIT */}
              <button
                type="submit"
                className="primary-button full-width"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Quote Request"}
              </button>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Quote;
