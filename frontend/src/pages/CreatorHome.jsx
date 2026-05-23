import "./CreatorHome.css";

function CreatorHome() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="creator-home">

      <section className="creator-hero">

        <div className="creator-overlay"></div>

        <div className="creator-content">

          <span className="creator-badge">
            Creative Community Platform
          </span>

          <h1>
            Welcome Back,
            <br />
            {user?.name || "Creator"} 🚀
          </h1>

          <p>
            Explore projects, connect with creators,
            share your ideas, and grow your digital presence.
          </p>

          <div className="creator-buttons">
            <button>
              Explore Projects
            </button>

            <button className="secondary-btn">
              Upload Work
            </button>
          </div>

        </div>

      </section>

      <section className="featured-section">

        <h2>Trending Creators</h2>

        <div className="creator-cards">

          <div className="creator-card">
            <h3>UI/UX Designers</h3>
            <p>
              Modern interfaces and interactive experiences.
            </p>
          </div>

          <div className="creator-card">
            <h3>Frontend Developers</h3>
            <p>
              Creative web applications and digital products.
            </p>
          </div>

          <div className="creator-card">
            <h3>3D Artists</h3>
            <p>
              Realistic environments and cinematic renders.
            </p>
          </div>

        </div>

      </section>

      <section className="community-section">

        <div className="community-box">

          <h2>Join The Future Of Creativity</h2>

          <p>
            Increnity is a place where creators,
            developers, and innovators collaborate
            together and showcase their work globally.
          </p>

        </div>

      </section>

    </div>
  );
}

export default CreatorHome;