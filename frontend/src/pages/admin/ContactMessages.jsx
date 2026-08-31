
import { useEffect, useState } from "react";

import {
  deleteContactMessage,
  getContactMessages,
} from "../../services/api";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    try {
      setError("");

      const data = await getContactMessages();

      setMessages(data);
    } catch (err) {
      setError(
        err.message || "Unable to load contact messages."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteContactMessage(id);

      setMessages((current) =>
        current.filter((message) => message.id !== id)
      );
    } catch (err) {
      setError(
        err.message || "Unable to delete message."
      );
    }
  };

  if (loading) {
    return (
      <main className="inner-page">
        <section className="section-padding">
          <div className="section-container">
            <h2>Loading Messages...</h2>
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
            Contact
            <span> Messages.</span>
          </h1>

          <p>
            Messages submitted by customers through the
            APO Solar website.
          </p>
        </div>
      </section>

      {/* =====================================================
          MESSAGES
      ===================================================== */}

      <section className="section-padding">
        <div className="section-container">
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

          {messages.length === 0 ? (
            <div className="contact-form-card">
              <h2>No messages yet.</h2>

              <p>
                Customer contact messages will appear here
                when submitted.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "20px",
              }}
            >
              {messages.map((message) => (
                <article
                  key={message.id}
                  className="contact-form-card"
                >
                  <p className="eyebrow dark">
                    MESSAGE #{message.id}
                  </p>

                  <h2>{message.full_name}</h2>

                  <p>
                    <strong>Email:</strong>{" "}
                    {message.email}
                  </p>

                  {message.phone && (
                    <p>
                      <strong>Phone:</strong>{" "}
                      {message.phone}
                    </p>
                  )}

                  {message.subject && (
                    <p>
                      <strong>Subject:</strong>{" "}
                      {message.subject}
                    </p>
                  )}

                  <p>
                    <strong>Message:</strong>
                  </p>

                  <p>{message.message}</p>

                  <small>
                    {new Date(
                      message.created_at
                    ).toLocaleString()}
                  </small>

                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <button
                      className="primary-button"
                      onClick={() =>
                        handleDelete(message.id)
                      }
                    >
                      Delete Message
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

export default ContactMessages;
