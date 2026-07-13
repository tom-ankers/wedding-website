import React, { useState } from "react";
import { withPrefix } from "gatsby";
import { withTranslation } from "react-i18next";

function Navbar(props) {
  const [active, setActive] = useState(false);

  const toggleHamburger = () => setActive((current) => !current);
  const activeClass = active ? "is-active" : "";

  const links = [
    ["navigation.home", "/en/"],
    ["navigation.location", "/en/location/"],
    ["navigation.accommodation", "/en/accommodation/"],
    ["navigation.activities", "/en/activities/"],
    ["navigation.rsvp", "/en/rsvp/"],
    ["navigation.faq", "/en/faq/"],
    ["navigation.contact", "/en/contact/"],
  ];

  return (
    <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
      <div className="container">
        <div className="navbar-brand">
          <button
            type="button"
            className={`navbar-burger burger ${activeClass}`}
            aria-label="menu"
            aria-expanded={active}
            onClick={toggleHamburger}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div id="navMenu" className={`navbar-menu ${activeClass}`}>
          <div className="navbar-start has-text-centered">
            {links.map(([label, path]) => (
              <a
                key={path}
                className="navbar-item"
                href={withPrefix(path)}
                onClick={() => setActive(false)}
              >
                {props.t(label)}
              </a>
            ))}
          </div>
          <div className="navbar-end has-text-centered">
            <a className="navbar-item" href={withPrefix("/en/")}>EN</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withTranslation()(Navbar);
