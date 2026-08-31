const About = () => {
  return (
    <main className="inner-page">

      {/* HERO */}
      <section className="page-hero">
        <div className="section-container">
          <p className="eyebrow">ABOUT APO SOLAR</p>

          <h1>
            Building a more reliable
            <span> energy future.</span>
          </h1>

          <p>
            We provide practical renewable energy solutions designed to
            help homes and businesses achieve dependable power.
          </p>
        </div>
      </section>


      {/* COMPANY INTRO */}
      <section className="section-padding">
        <div className="section-container two-column-layout">

          <div>
            <p className="eyebrow dark">WHO WE ARE</p>

            <h2>
              Your partner for smarter solar energy.
            </h2>
          </div>

          <div>
            <p className="section-text">
              APO Solar Limited is a renewable energy company focused on
              solar inverter sales and professional installation.
            </p>

            <p className="section-text">
              Our goal is to make dependable solar energy more accessible
              by helping customers understand their energy needs and
              choose practical solutions.
            </p>

            <p className="section-text">
              Whether you need a solution for your home, office, shop or
              business, we work to provide a system that fits your
              requirements.
            </p>
          </div>

        </div>
      </section>


      {/* MISSION / VISION */}
      <section className="dark-section section-padding">
        <div className="section-container">

          <div className="mission-grid">

            <article>
              <p className="eyebrow">OUR MISSION</p>

              <h2>
                Make reliable renewable energy practical and accessible.
              </h2>

              <p>
                We aim to provide customers with dependable solar
                solutions backed by professional service and technical
                support.
              </p>
            </article>

            <article>
              <p className="eyebrow">OUR VISION</p>

              <h2>
                A future powered by cleaner and smarter energy.
              </h2>

              <p>
                We envision a future where homes and businesses can
                confidently use renewable energy to improve their power
                reliability and reduce dependence on conventional
                electricity sources.
              </p>
            </article>

          </div>

        </div>
      </section>


      {/* VALUES */}
      <section className="section-padding">
        <div className="section-container">

          <div className="section-heading">
            <p className="eyebrow dark">OUR VALUES</p>

            <h2>What guides our work.</h2>
          </div>

          <div className="value-grid">

            <div className="value-card">
              <h3>Integrity</h3>
              <p>
                We believe in honest communication and transparent
                recommendations.
              </p>
            </div>

            <div className="value-card">
              <h3>Quality</h3>
              <p>
                We focus on dependable products and professional
                workmanship.
              </p>
            </div>

            <div className="value-card">
              <h3>Innovation</h3>
              <p>
                We embrace modern renewable energy technologies and
                smarter approaches to power.
              </p>
            </div>

            <div className="value-card">
              <h3>Customer Satisfaction</h3>
              <p>
                We build our services around understanding and solving
                our customers' energy needs.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="cta-section about-page-cta">
        <div className="section-container">

          <h2>Let's create a better energy solution.</h2>

          <p>
            Talk to APO Solar Limited about your solar inverter
            requirements.
          </p>

          <a href="/contact" className="primary-button">
            Contact Us
          </a>

        </div>
      </section>

    </main>
  );
};

export default About;