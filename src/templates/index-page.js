import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import RsvpForm from "../components/RsvpForm";

export default function IndexPage({ data }) {
  const home = data.home.frontmatter;
  const venue = data.venue.frontmatter;
  const stay = data.stay.frontmatter;
  return (
    <Layout>
      <main id="home" className="wedding-page">
        <header className="wedding-intro has-text-centered">
          <p className="wedding-eyebrow">We are getting married</p>
          <h1>{home.title}</h1>
          <p className="subtitle">{home.date}</p>
          <p>We cannot wait to celebrate with you.</p>
          <a className="button is-primary mt-4" href="#rsvp">
            RSVP
          </a>
        </header>
        <section
          id="venue"
          className="section wedding-section"
          aria-labelledby="venue-title"
        >
          <div className="container">
            <h2 id="venue-title" className="title is-size-3">
              Venue
            </h2>
            <div className="columns is-variable is-6">
              <div className="column is-5">
                <h3 className="title is-size-4">{venue.title}</h3>
                <p>{venue.mainpitch.descriptionTuscany}</p>
                <p className="mt-4">
                  Our ceremony and celebrations will all take place at the same
                  venue.
                </p>
                <address className="my-5">
                  {venue.address.street}
                  <br />
                  {venue.address.city}
                  <br />
                  {venue.address.country}
                </address>
                <a
                  href="https://maps.app.goo.gl/cXMuLV4BqcBaxcVo6?g_st=ic"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps ↗
                </a>
                <p className="mt-4">
                  Parking, arrival and transport details will be shared closer
                  to the wedding.
                </p>
              </div>
              <div className="column is-7">
                <div className="venue-map-wrapper">
                  <iframe
                    title="The Barns at Delbury Hall map"
                    src="https://www.google.com/maps?q=The%20Barns%20at%20Delbury%20Hall%2C%20Diddlebury%2C%20Craven%20Arms&output=embed"
                    width="100%"
                    height="380"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="accommodation"
          className="section wedding-section"
          aria-labelledby="accommodation-title"
        >
          <div className="container">
            <h2 id="accommodation-title" className="title is-size-3">
              Accommodation
            </h2>
            <p>{stay.description}</p>
            <div className="columns is-variable is-5 mt-4">
              {stay.accommodations.map((area) => (
                <div className="column" key={area.name}>
                  <article className="stay-card">
                    <h3 className="title is-size-4">{area.name}</h3>
                    <p>{area.description}</p>
                    <a href={area.url} target="_blank" rel="noreferrer">
                      Find places to stay in {area.name} ↗
                    </a>
                  </article>
                </div>
              ))}
            </div>
            <p className="mt-4">{stay.information}</p>
          </div>
        </section>
        <section
          id="rsvp"
          className="section wedding-section"
          aria-labelledby="rsvp-title"
        >
          <div className="container">
            <div className="has-text-centered mb-5">
              <h2 id="rsvp-title" className="title is-size-3">
                RSVP
              </h2>
              <p>{data.rsvp.frontmatter.description}</p>
              <p className="mt-3">Please submit one RSVP for each guest.</p>
            </div>
            <RsvpForm />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query WeddingHome {
    home: markdownRemark(
      fields: { langKey: { eq: "en" } }
      frontmatter: { templateKey: { eq: "index-page" } }
    ) {
      frontmatter {
        title
        date
      }
    }
    venue: markdownRemark(
      fields: { langKey: { eq: "en" } }
      frontmatter: { templateKey: { eq: "location-page" } }
    ) {
      frontmatter {
        title
        mainpitch {
          descriptionTuscany
        }
        address {
          street
          city
          country
        }
      }
    }
    stay: markdownRemark(
      fields: { langKey: { eq: "en" } }
      frontmatter: { templateKey: { eq: "accomodation-page" } }
    ) {
      frontmatter {
        description
        information
        accommodations {
          name
          description
          url
        }
      }
    }
    rsvp: markdownRemark(
      fields: { langKey: { eq: "en" } }
      frontmatter: { templateKey: { eq: "rsvp-page" } }
    ) {
      frontmatter {
        description
      }
    }
  }
`;
