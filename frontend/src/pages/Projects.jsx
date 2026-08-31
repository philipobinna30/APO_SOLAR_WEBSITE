

const Projects = () => {
  const projects = [
    {
      title: "Residential Solar Installation",
      category: "RESIDENTIAL",
      description:
        "A professionally configured solar inverter and battery solution designed to provide dependable backup power and renewable energy for a residential property.",
      image: "/products/residential/residential-1.jpg.jpeg",
      imageAlt: "Residential solar installation by APO Solar Limited",
    },
    {
      title: "Business Power Solution",
      category: "COMMERCIAL",
      description:
        "A reliable renewable energy solution designed to support the electricity requirements of a business environment while improving power availability and energy efficiency.",
      image: "/products/commercial/commercial-1.jpg.jpeg",
      imageAlt: "Commercial solar power solution by APO Solar Limited",
    },
    {
      title: "Solar Inverter Upgrade",
      category: "UPGRADE",
      description:
        "A solar power system upgrade designed to increase available power, improve energy storage and provide a more reliable electricity setup.",
      image: "/products/upgrades/upgrade-1.jpg.jpeg",
      imageAlt: "Solar inverter upgrade by APO Solar Limited",
    },
  ];

  return (
    <main className="inner-page">

      {/* HERO */}
      <section className="page-hero">

        <div className="section-container">

          <p className="eyebrow">
            OUR PROJECTS
          </p>

          <h1>
            Real solutions for
            <span> real energy needs.</span>
          </h1>

          <p>
            Explore selected solar energy projects and installation
            solutions delivered by APO Solar Limited.
          </p>

        </div>

      </section>


      {/* PROJECTS */}
      <section className="section-padding">

        <div className="section-container">

          <div className="section-heading">

            <p className="eyebrow dark">
              SELECTED PROJECTS
            </p>

            <h2>
              Solar solutions built around our customers.
            </h2>

            <p>
              Every solar installation is designed around the customer's
              energy requirements, property and expected usage. Our goal is
              to provide practical, dependable and efficient renewable
              energy solutions.
            </p>

          </div>


          <div className="project-grid">

            {projects.map((project) => (
              <article
                className="project-card"
                key={project.title}
              >

                {/* PROJECT IMAGE */}
                <div className="project-image">

                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                  />

                </div>


                {/* PROJECT CONTENT */}
                <div className="project-content">

                  <p className="project-category">
                    {project.category}
                  </p>

                  <h2>
                    {project.title}
                  </h2>

                  <p>
                    {project.description}
                  </p>

                  <a
                    href="/contact"
                    className="card-link"
                  >
                    Discuss Your Project →
                  </a>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* FUTURE PROJECT CTA */}
      <section className="dark-section section-padding">

        <div className="section-container two-column-layout">

          <div>

            <p className="eyebrow">
              YOUR PROJECT COULD BE NEXT
            </p>

            <h2>
              Let's design a solar solution around your requirements.
            </h2>

          </div>


          <div>

            <p>
              Whether you're looking for a residential solar system,
              commercial power solution or an upgrade to an existing
              installation, our team is ready to discuss your requirements.
            </p>

            <a
              href="/quote"
              className="primary-button"
            >
              Start Your Project
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Projects;

