
const Products = () => {
  const products = [
    {
      category: "SOLAR INVERTERS",
      title: "Hybrid Solar Inverter Systems",
      description:
        "Efficient inverter solutions designed to work with solar panels, batteries and other power sources.",
      image: "/products/inverters/inverter-1.jpg.jpeg",
      imageAlt: "Hybrid solar inverter system",
    },
    {
      category: "ENERGY STORAGE",
      title: "Solar Battery Systems",
      description:
        "Reliable energy storage solutions designed to store solar power for use when required.",
      image: "/products/batteries/battery-2.jpg.jpeg",
      imageAlt: "Solar battery energy storage system",
    },
    {
      category: "SOLAR PANELS",
      title: "Solar Panel Systems",
      description:
        "Quality solar panels designed to capture renewable energy and support dependable solar power systems.",
      image: "/products/panels/panels-1.jpg.jpeg",
      imageAlt: "Solar panel system",
    },
    {
      category: "POWER SOLUTIONS",
      title: "Complete Inverter Packages",
      description:
        "Configured solar solutions combining essential components according to your energy requirements.",
      image: "/products/packages/package-1.jpg.jpg",
      imageAlt: "Complete solar inverter package",
    },
  ];

  return (
    <main className="inner-page">

      {/* HERO */}
      <section className="page-hero">
        <div className="section-container">

          <p className="eyebrow">OUR PRODUCTS</p>

          <h1>
            Solar products designed for
            <span> dependable power.</span>
          </h1>

          <p>
            Explore our range of solar inverter, battery, panel and renewable
            energy solutions.
          </p>

        </div>
      </section>


      {/* PRODUCTS */}
      <section className="section-padding">
        <div className="section-container">

          <div className="section-heading">

            <p className="eyebrow dark">
              PRODUCT CATEGORIES
            </p>

            <h2>
              Solutions for different energy needs.
            </h2>

            <p>
              The right solar system depends on your energy consumption,
              property and expected usage. We help you identify suitable
              products for your requirements.
            </p>

          </div>


          <div className="product-grid">

            {products.map((product) => (
              <article
                className="product-card"
                key={product.title}
              >

                {/* PRODUCT IMAGE */}
                <div className="product-image">

                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                  />

                </div>


                {/* PRODUCT CONTENT */}
                <div className="product-content">

                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>
                    {product.title}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <a
                    href="/quote"
                    className="card-link"
                  >
                    Request Information →
                  </a>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* PRODUCT ADVICE */}
      <section className="dark-section section-padding products-advice">

        <div className="section-container two-column-layout">

          <div>

            <p className="eyebrow">
              NOT SURE WHAT YOU NEED?
            </p>

            <h2>
              Let us help you choose the right system.
            </h2>

          </div>


          <div>

            <p>
              Solar inverter sizing depends on the appliances you use,
              power requirements, battery capacity and expected usage.
              Our team can help you determine the right combination of
              products for your property.
            </p>

            <a
              href="/quote"
              className="primary-button"
            >
              Talk to Our Team
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Products;

