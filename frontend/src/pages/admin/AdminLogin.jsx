
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  loginUser,
} from "../../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginUser(email, password);

      // Verify that the authenticated account is actually an admin.
      const user = await getCurrentUser();

      if (user.role !== "admin") {
        localStorage.removeItem("apo_solar_token");

        throw new Error(
          "Administrator access required."
        );
      }

      navigate("/admin", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message ||
          "Unable to log in. Please check your email and password."
      );
    } finally {
      setLoading(false);
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
            APO SOLAR ADMINISTRATION
          </p>

          <h1>
            Administrator
            <span> Login.</span>
          </h1>

          <p>
            Sign in to manage customer messages and quotation
            requests.
          </p>
        </div>
      </section>

      {/* =====================================================
          LOGIN FORM
      ===================================================== */}

      <section className="section-padding">
        <div
          className="section-container"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <div className="contact-form-card">
            <h2>Admin Login</h2>

            {error && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "14px",
                  borderRadius: "8px",
                  background: "#ffe8e8",
                  color: "#a00000",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}

              <div className="form-group">
                <label htmlFor="admin-email">
                  Email Address
                </label>

                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Administrator email"
                  autoComplete="email"
                  required
                />
              </div>

              {/* PASSWORD */}

              <div className="form-group">
                <label htmlFor="admin-password">
                  Password
                </label>

                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Administrator password"
                  autoComplete="current-password"
                  required
                />
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="primary-button full-width"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
