const Services = () => {
  const services = [
    {
      number: "01",
      title: "Solar Inverter Sales",
      description:
        "We provide solar inverter solutions selected according to your energy requirements and intended application.",
    },
    {
      number: "02",
      title: "Solar Inverter Installation",
      description:
        "Our professional installation service focuses on proper system configuration, safe connections and reliable operation.",
    },
    {
      number: "03",
      title: "System Assessment",
      description:
        "We help evaluate your power requirements so you can make a more informed decision about your solar energy system.",
    },
    {
      number: "04",
      title: "Maintenance & Support",
      description:
        "We provide technical support and maintenance services to help keep your system operating effectively.",
    },
    {
      number: "05",
      title: "System Upgrades",
      description:
        "As your energy requirements change, we can help identify options for improving or expanding your existing system.",
    },
    {
      number: "06",
      title: "Energy Consultation",
      description:
        "Get guidance on solar inverter systems, energy storage and practical renewable energy solutions.",
    },
  ];

  return (
    <main className="inner-page">

      {/* HERO */}
      <section className="page-hero">
        <div className="section-container">

          <p className="eyebrow">OUR SERVICES</p>

          <h1>
            Professional solar solutions
            <span> from start to finish.</span>
          </h1>

          <p>
            We help customers move from energy challenges to dependable
            solar power solutions.
          </p>

        </div>
      </section>


      {/* SERVICES */}
      <section className="section-padding">

        <div className="section-container">

          <div className="service-list">

            {services.map((service) => (
              <article className="service-row" key={service.number}>

                <span className="service-row-number">
                  {service.number}
                </span>

                <div>
                  <h2>{service.title}</h2>

                  <p>{service.description}</p>
                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* PROCESS */}
      <section className="services-process dark-section section-padding">

        <div className="section-container">

          <div className="section-heading">

            <p className="eyebrow">OUR APPROACH</p>

            <h2>
              A straightforward process.
            </h2>

          </div>

          <div className="process-grid">

            <div className="process-step">
              <span>01</span>
              <h3>Consultation</h3>
              <p>
                We understand your power requirements and expectations.
              </p>
            </div>

            <div className="process-step">
              <span>02</span>
              <h3>Recommendation</h3>
              <p>
                We identify a suitable solution based on your needs.
              </p>
            </div>

            <div className="process-step">
              <span>03</span>
              <h3>Installation</h3>
              <p>
                Your system is professionally installed and configured.
              </p>
            </div>

            <div className="process-step">
              <span>04</span>
              <h3>Support</h3>
              <p>
                We remain available for technical support and maintenance.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <div className="section-container">

          <h2>Need a solar inverter installation?</h2>

          <p>
            Tell us about your power requirements and let's discuss the
            right solution.
          </p>

          <a href="/quote" className="primary-button">
            Request a Quote
          </a>

        </div>

      </section>

    </main>
  );
};

export default Services;