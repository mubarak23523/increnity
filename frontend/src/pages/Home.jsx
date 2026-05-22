import { useEffect } from "react";
import PublicNavbar from "../components/PublicNavbar";
import "./Public.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

  return (
    <>
      <PublicNavbar />

      <section className="hero" data-aos="fade-up">
        <div className="hero-content">
          <span className="badge">Creative Open-Source Community</span>

          <h1>
Build, Share & Discover Creative Projects With Developers And Designers Worldwide
          </h1>

          <p>
            Increnity is a modern community platform where developers, designers and creators share projects, explore ideas and collaborate on innovative digital experiences together.
          </p>

          <div className="hero-buttons">
            <a href="/projects-public" className="primary-btn">
              Explore Projects
            </a>

            <a href="/contact" className="secondary-btn">
              Join Community
            </a>
          </div>
        </div>

        <div className="hero-card">
          <h3>Increnity Community</h3>
          <p>Design • Development • Digital Growth</p>

          <div className="mini-stats">
            <div>
              <h2>Collabrate</h2>
              <span>Brand-first design</span>
            </div>

            <div>
              <h2>Innovate</h2>
              <span>Backend-powered systems</span>
            </div>
          </div>
        </div>
      </section>

   <section className="about-preview" data-aos="fade-up">
  <div className="about-left">
    <span>ABOUT INCRENITY</span>

    <h2>
      A Modern Community Platform Built For Developers, Designers And Creators
    </h2>

    <p>
      Increnity helps creators showcase projects, share innovative ideas,
      connect with like-minded people and collaborate on meaningful digital
      experiences together.
    </p>

    <a href="/about">Explore Community</a>
  </div>

  <div className="about-right">

    <div className="about-card">
      <h3>Share Projects</h3>

      <p>
        Upload creative projects, showcase your work and inspire the community.
      </p>
    </div>

    <div className="about-card">
      <h3>Collaborate</h3>

      <p>
        Connect with developers, designers and creators from around the world.
      </p>
    </div>

    <div className="about-card">
      <h3>Grow Together</h3>

      <p>
        Learn, build and improve through a creative open-source ecosystem.
      </p>
    </div>

  </div>
</section>

<section className="home-services" data-aos="fade-up">

  <div className="section-header">
    <span>COMMUNITY</span>

    <h2>What You Can Do</h2>

    <p>
      Everything creators need to build, share and collaborate.
    </p>
  </div>

  <div className="home-service-grid">

    <div className="home-service-card">
      <h3>Upload Projects</h3>

      <p>
        Share your creative work, applications, websites and ideas with the
        community.
      </p>
    </div>

    <div className="home-service-card">
      <h3>Discover Creators</h3>

      <p>
        Explore projects from talented developers and designers worldwide.
      </p>
    </div>

    <div className="home-service-card">
      <h3>Build Connections</h3>

      <p>
        Collaborate with creators and grow together through shared innovation.
      </p>
    </div>

  </div>
</section>

<section className="home-projects" data-aos="fade-up">

  <div className="section-header">
    <span>PROJECTS</span>

    <h2>Trending Community Projects</h2>

    <p>
      Discover innovative digital products shared by the Increnity community.
    </p>
  </div>

  <div className="home-project-grid">

    <div className="home-project-card">
      <h3>AI Productivity Platform</h3>

      <p>
        A smart productivity tool designed for modern creators and startups.
      </p>
    </div>

    <div className="home-project-card">
      <h3>Creative Portfolio System</h3>

      <p>
        A premium portfolio experience built for designers and developers.
      </p>
    </div>

    <div className="home-project-card">
      <h3>Open Source Dashboard</h3>

      <p>
        A collaborative admin system powered by modern MERN technologies.
      </p>
    </div>

  </div>
</section>

<footer className="footer">

  <h2>Increnity</h2>

  <p>
    A modern creative platform where developers, designers and creators
    collaborate, share projects and build innovative digital experiences
    together.
  </p>

  <div className="footer-links">
    <a href="/">Home</a>
    <a href="/projects-public">Explore</a>
    <a href="/services-public">Community</a>
    <a href="/contact">Support</a>
  </div>

  <span>
    © 2026 Increnity. Built for creators worldwide.
  </span>

</footer>
    </>
  );
}

export default Home;