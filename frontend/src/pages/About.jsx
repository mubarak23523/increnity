import PublicNavbar from "../components/PublicNavbar";
import "./Public.css";

function About() {
  return (
    <>
      <PublicNavbar />

      <main className="about-page">

        <section className="about-hero">

          <div className="about-hero-left">

            <span className="badge">About Increnity</span>

            <h1>
              A Creative Studio Building Modern Digital Experiences
            </h1>

            <p>
              Increnity is a creative digital studio focused on building
              clean websites, modern UI systems, backend-powered platforms,
              and scalable digital experiences for startups and businesses.
            </p>

          </div>

          <div className="about-hero-right">

            <div className="about-info-card">
              <h3>Creative Design</h3>

              <p>
                Clean, modern and visually engaging interfaces crafted for
                brands and startups.
              </p>
            </div>

            <div className="about-info-card">
              <h3>Modern Development</h3>

              <p>
                Frontend and backend systems using React, Node.js,
                Express and MongoDB.
              </p>
            </div>

          </div>

        </section>

        <section className="about-values">

          <div className="section-header">
            <span>OUR VALUES</span>

            <h2>What Makes Increnity Different</h2>

            <p>
              We focus on clean design, scalable systems and modern user
              experiences that help brands grow online.
            </p>
          </div>

          <div className="values-grid">

            <div className="value-card">
              <h3>Creative Thinking</h3>

              <p>
                Every project is designed with creativity, clarity and modern
                visual identity.
              </p>
            </div>

            <div className="value-card">
              <h3>Performance</h3>

              <p>
                Fast-loading, responsive and optimized digital products for
                modern devices.
              </p>
            </div>

            <div className="value-card">
              <h3>Scalable Systems</h3>

              <p>
                Backend-powered solutions built to grow with startups and
                businesses.
              </p>
            </div>

          </div>

        </section>

      </main>
    </>
  );
}

export default About;