
import { useEffect, useState } from "react";

import {
  deleteQuoteRequest,
  getQuoteRequests,
} from "../../services/api";

const QuoteRequests = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadQuotes = async () => {
    try {
      setError("");

      const data = await getQuoteRequests();

      setQuotes(data);
    } catch (err) {
      setError(
        err.message || "Unable to load quote requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quote request?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteQuoteRequest(id);

      setQuotes((current) =>
        current.filter((quote) => quote.id !== id)
      );
    } catch (err) {
      setError(
        err.message || "Unable to delete quote request."
      );
    }
  };

  if (loading) {
    return (
      <main className="inner-page">
        <section className="section-padding">
          <div className="section-container">
            <h2>Loading Quote Requests...</h2>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="inner-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="page-hero">
        <div className="section-container">
          <p className="eyebrow">
            ADMINISTRATION
          </p>

          <h1>
            Quote
            <span> Requests.</span>
          </h1>

          <p>
            Manage quotation requests submitted by APO Solar customers.
          </p>
        </div>
      </section>

      {/* =====================================================
          QUOTE REQUESTS
      ===================================================== */}

      <section className="section-padding">
        <div className="section-container">

          {/* ERROR MESSAGE */}

          {error && (
            <div
              style={{
                marginBottom: "25px",
                padding: "15px",
                borderRadius: "8px",
                background: "#ffe8e8",
                color: "#a00000",
              }}
            >
              {error}
            </div>
          )}

          {/* NO QUOTES */}

          {quotes.length === 0 ? (
            <div className="contact-form-card">
              <h2>No quote requests yet.</h2>

              <p>
                Customer quotation requests will appear here when
                submitted.
              </p>
            </div>
          ) : (

            /* QUOTE LIST */

            <div
              style={{
                display: "grid",
                gap: "20px",
              }}
            >
              {quotes.map((quote) => (
                <article
                  key={quote.id}
                  className="contact-form-card"
                >

                  {/* REQUEST NUMBER */}

                  <p className="eyebrow dark">
                    QUOTE REQUEST #{quote.id}
                  </p>

                  {/* CUSTOMER NAME */}

                  <h2>
                    {quote.full_name}
                  </h2>

                  {/* EMAIL */}

                  <p>
                    <strong>Email:</strong>{" "}
                    {quote.email}
                  </p>

                  {/* PHONE */}

                  <p>
                    <strong>Phone:</strong>{" "}
                    {quote.phone}
                  </p>

                  {/* SERVICE */}

                  <p>
                    <strong>Service:</strong>{" "}
                    {quote.service}
                  </p>

                  {/* PROPERTY TYPE */}

                  {quote.property_type && (
                    <p>
                      <strong>Property:</strong>{" "}
                      {quote.property_type}
                    </p>
                  )}

                  {/* ESTIMATED BUDGET */}

                  {quote.budget && (
                    <p>
                      <strong>Budget:</strong>{" "}
                      {quote.budget}
                    </p>
                  )}

                  {/* LOCATION */}

                  {quote.location && (
                    <p>
                      <strong>Location:</strong>{" "}
                      {quote.location}
                    </p>
                  )}

                  {/* ADDITIONAL INFORMATION */}

                  {quote.message && (
                    <>
                      <p>
                        <strong>
                          Additional Information:
                        </strong>
                      </p>

                      <p>
                        {quote.message}
                      </p>
                    </>
                  )}

                  {/* DATE */}

                  <small>
                    {quote.created_at
                      ? new Date(
                          quote.created_at
                        ).toLocaleString()
                      : "Date unavailable"}
                  </small>

                  {/* DELETE BUTTON */}

                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() =>
                        handleDelete(quote.id)
                      }
                    >
                      Delete Quote Request
                    </button>
                  </div>

                </article>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default QuoteRequests;
