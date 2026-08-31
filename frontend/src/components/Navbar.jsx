import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="site-header">

      <div className="nav-container">

        {/* LOGO */}
        <NavLink to="/" className="brand-logo">

          <img
            src="/apo-solar-logo.png"
            alt="APO Solar Limited"
          />

        </NavLink>


        {/* NAVIGATION */}
        <nav className="main-navigation">

          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/about">
            About Us
          </NavLink>

          <NavLink to="/products">
            Products
          </NavLink>

          <NavLink to="/services">
            Services
          </NavLink>

          <NavLink to="/projects">
            Projects
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>

        </nav>


        {/* QUOTE BUTTON */}
        <NavLink
          to="/quote"
          className="nav-quote-button"
        >
          Get a Quote
        </NavLink>

      </div>

    </header>
  );
};

export default Navbar;