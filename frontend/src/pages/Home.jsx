const Home = () => {
  return (
    <main className="home-page">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content section-container">
          <div className="hero-text">
            <p className="eyebrow">RENEWABLE ENERGY SOLUTIONS</p>

            <h1>
              Reliable Power.
              <span> Smarter Energy.</span>
              <br />
              A Brighter Future.
            </h1>

            <p className="hero-description">
              APO Solar Limited provides dependable solar inverter systems
              for homes and businesses, from quality product selection to
              professional installation and ongoing technical support.
            </p>

            <div className="hero-actions">
              <a href="/quote" className="primary-button">
                Get a Free Quote
              </a>

              <a href="/services" className="outline-button">
                Explore Our Services
              </a>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="stat-item">
              <strong>Reliable</strong>
              <span>Energy Solutions</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <strong>Professional</strong>
              <span>Installation</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <strong>Dedicated</strong>
              <span>Customer Support</span>
            </div>
          </div>
        </div>
      </section>


      {/* =========================
          INTRODUCTION
      ========================== */}
      <section className="intro-section section-padding">
        <div className="section-container two-column-layout">

          <div>
            <p className="eyebrow dark">ABOUT APO SOLAR</p>

            <h2>
              Powering homes and businesses with dependable solar energy.
            </h2>
          </div>

          <div>
            <p className="section-text">
              APO Solar Limited is focused on helping individuals,
              households and businesses achieve more reliable electricity
              through modern renewable energy solutions.
            </p>

            <p className="section-text">
              We specialize in solar inverter sales and professional
              installation, providing practical systems designed around
              each customer's energy requirements.
            </p>

            <a href="/about" className="text-link">
              Learn more about APO Solar →
            </a>
          </div>

        </div>
      </section>


      {/* =========================
          SERVICES
      ========================== */}
      <section className="services-section section-padding">
        <div className="section-container">

          <div className="section-heading">
            <p className="eyebrow dark">WHAT WE DO</p>

            <h2>Complete Solar Energy Solutions</h2>

            <p>
              From choosing the right inverter system to professional
              installation, we help make your transition to solar simple.
            </p>
          </div>

          <div className="service-grid">

            <article className="service-card">
              <div className="service-number">01</div>
              <h3>Solar Inverter Sales</h3>
              <p>
                Get suitable inverter solutions based on your power
                requirements, property and expected energy usage.
              </p>
              <a href="/products" className="card-link">
                View Products →
              </a>
            </article>

            <article className="service-card">
              <div className="service-number">02</div>
              <h3>Professional Installation</h3>
              <p>
                Our installation service is designed to deliver safe,
                organized and reliable solar inverter system setups.
              </p>
              <a href="/services" className="card-link">
                Learn More →
              </a>
            </article>

            <article className="service-card">
              <div className="service-number">03</div>
              <h3>Maintenance & Support</h3>
              <p>
                We help customers maintain their systems and address
                technical requirements for dependable long-term operation.
              </p>
              <a href="/services" className="card-link">
                Our Services →
              </a>
            </article>

          </div>
        </div>
      </section>


      {/* =========================
          WHY CHOOSE US
      ========================== */}
      <section className="why-section section-padding">
        <div className="section-container">

          <div className="section-heading">
            <p className="eyebrow">WHY APO SOLAR</p>

            <h2>Built around your energy needs.</h2>
          </div>

          <div className="benefits-grid">

            <div className="benefit">
              <span>01</span>
              <h3>Quality Solutions</h3>
              <p>
                We focus on dependable solar energy equipment and
                solutions suitable for real-world energy needs.
              </p>
            </div>

            <div className="benefit">
              <span>02</span>
              <h3>Professional Approach</h3>
              <p>
                From consultation to installation, we approach every
                project with attention to detail.
              </p>
            </div>

            <div className="benefit">
              <span>03</span>
              <h3>Customer Focused</h3>
              <p>
                We listen to your requirements and recommend solutions
                based on your actual energy situation.
              </p>
            </div>

            <div className="benefit">
              <span>04</span>
              <h3>Long-Term Support</h3>
              <p>
                Our relationship with customers continues beyond the
                initial installation.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* =========================
          PROCESS
      ========================== */}
      <section className="process-section section-padding">
        <div className="section-container">

          <div className="section-heading">
            <p className="eyebrow dark">HOW IT WORKS</p>

            <h2>From consultation to installation.</h2>
          </div>

          <div className="process-grid">

            <div className="process-step">
              <span>01</span>
              <h3>Tell Us Your Needs</h3>
              <p>
                Share your electricity requirements and what you want
                your solar system to achieve.
              </p>
            </div>

            <div className="process-step">
              <span>02</span>
              <h3>Get a Recommendation</h3>
              <p>
                We assess your requirements and recommend an appropriate
                solar inverter solution.
              </p>
            </div>

            <div className="process-step">
              <span>03</span>
              <h3>Professional Installation</h3>
              <p>
                Our team installs and configures your solar inverter
                system.
              </p>
            </div>

            <div className="process-step">
              <span>04</span>
              <h3>Enjoy Reliable Power</h3>
              <p>
                Start using your solar solution with continued support
                when you need it.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* =========================
          CTA
      ========================== */}
      <section className="cta-section">
        <div className="section-container">

          <p className="eyebrow">READY FOR BETTER POWER?</p>

          <h2>Let's build the right solar solution for you.</h2>

          <p>
            Tell us what you need and let APO Solar Limited help you
            determine the right solution.
          </p>

          <a href="/quote" className="primary-button">
            Request a Quote
          </a>

        </div>
      </section>

    </main>
  );
};

export default Home;