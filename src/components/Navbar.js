import React, { useState } from "react";
import { withPrefix } from "gatsby";

export default function Navbar() {
  const [active, setActive] = useState(false);
  return (
    <nav className="navbar wedding-nav" aria-label="Main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href={`${withPrefix("/en/")}#home`}>
            Tom &amp; Emma
          </a>
          <button
            type="button"
            className={`navbar-burger ${active ? "is-active" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={active}
            aria-controls="navMenu"
            onClick={() => setActive(!active)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${active ? "is-active" : ""}`}
        >
          <div className="navbar-end has-text-centered">
            {["Venue", "Accommodation", "Taxis", "Gifts", "RSVP"].map(
              (label) => (
                <a
                  key={label}
                  className="navbar-item"
                  href={`${withPrefix("/en/")}#${label.toLowerCase()}`}
                  onClick={() => setActive(false)}
                >
                  {label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
