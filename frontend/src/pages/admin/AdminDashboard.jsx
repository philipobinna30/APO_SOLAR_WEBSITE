
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getContactMessages,
  getQuoteRequests,
  getCurrentUser,
  logoutUser,
} from "../../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [quotes, setQuotes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [currentUser, contactData, quoteData] =
          await Promise.all([
            getCurrentUser(),
            getContactMessages(),
            getQuoteRequests(),
          ]);

        setUser(currentUser);
        setContacts(contactData);
        setQuotes(quoteData);
      } catch (err) {
        setError(
          err.message || "Unable to load dashboard."
        );

        if (
          err.message?.toLowerCase().includes("token") ||
          err.message?.toLowerCase().includes("authentication") ||
          err.message?.toLowerCase().includes("administrator")
        ) {
          logoutUser();

          navigate("/admin/login", {
            replace: true,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();

    navigate("/admin/login", {
      replace: true,
    });
  };

  if (loading) {
    return (
      <main className="inner-page">
        <section className="section-padding">
          <div className="section-container">
            <h2>Loading Admin Dashboard...</h2>
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
            APO SOLAR ADMINISTRATION
          </p>

          <h1>
            Admin
            <span> Dashboard.</span>
          </h1>

          <p>
            Welcome back
            {user?.full_name
              ? `, ${user.full_name}`
              : ""}
            .
            Manage customer enquiries and quotation
            requests.
          </p>
        </div>
      </section>

      {/* =====================================================
          DASHBOARD
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

          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <div className="contact-form-card">
              <p className="eyebrow dark">
                CONTACT MESSAGES
              </p>

              <h2>{contacts.length}</h2>

              <p>
                Customer messages received through the
                website.
              </p>
            </div>

            <div className="contact-form-card">
              <p className="eyebrow dark">
                QUOTE REQUESTS
              </p>

              <h2>{quotes.length}</h2>

              <p>
                Quote requests submitted by customers.
              </p>
            </div>
          </div>

          {/* =================================================
              ADMIN ACTIONS
          ================================================= */}

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <button
              className="primary-button"
              onClick={() =>
                navigate("/admin/messages")
              }
            >
              View Contact Messages
            </button>

            <button
              className="primary-button"
              onClick={() =>
                navigate("/admin/quotes")
              }
            >
              View Quote Requests
            </button>

            <button
              className="primary-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
