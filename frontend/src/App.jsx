import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// ============================================================
// PUBLIC PAGES
// ============================================================

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";

// ============================================================
// ADMIN PAGES
// ============================================================

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ContactMessages from "./pages/admin/ContactMessages";
import QuoteRequests from "./pages/admin/QuoteRequests";

import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ==================================================
            PUBLIC WEBSITE
        ================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/quote"
          element={<Quote />}
        />

        {/* ==================================================
            ADMIN LOGIN
        ================================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ==================================================
            PROTECTED ADMIN AREA
        ================================================== */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/messages"
            element={<ContactMessages />}
          />

          <Route
            path="/admin/quotes"
            element={<QuoteRequests />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;