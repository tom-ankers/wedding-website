import React from "react";
import { graphql, withPrefix } from "gatsby";
import Layout from "../components/Layout";
import RsvpForm from "../components/RsvpForm";
import Countdown from "../components/Countdown";

const venuePhotos = [
  [
    "ca8e675c-a099-4175-85c4-e290997296ee/delbury_styled-shoot-120.jpg",
    "The grounds at The Barns at Delbury Hall",
  ],
  [
    "e6f9a195-b05f-47c0-9f13-d8902fbf7ca9/0401.jpg",
    "Wedding celebrations at Delbury Hall",
  ],
  [
    "aab0beae-f704-4d1e-ab5d-3e1b9c2ee39b/DSC02967.jpg",
    "The Barns at Delbury Hall wedding venue",
  ],
];
const taxis = [
  {
    name: "Wolfcar Private Hire",
    area: "Ludlow & South Shropshire",
    phone: "01584 856690",
    dial: "+441584856690",
    url: "https://www.wolfcarprivatehire.com/",
  },
  {
    name: "Annette’s Taxis",
    area: "Ludlow",
    phone: "01584 878787",
    dial: "+441584878787",
    url: "https://www.ludlow.org.uk/businessdetail.asp?BusID=329",
  },
  {
    name: "Ludlow Taxis",
    area: "Ludlow",
    phone: "01584 876666",
    dial: "+441584876666",
    url: "https://www.ludlow.org.uk/businessdetail.asp?BusID=1571",
  },
];

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
          <Countdown />
          <a className="button is-primary mt-4" href="#rsvp">
            RSVP
          </a>
        </header>
        <div className="couple-photos" aria-label="Photos of Tom and Emma">
          {["mallorca", "rome", "holiday"].map((photo) => (
            <img
              key={photo}
              src={withPrefix(`/img/tom-emma-${photo}.jpg`)}
              alt={`Tom and Emma ${
                photo === "rome"
                  ? "in Rome"
                  : photo === "mallorca"
                  ? "in Mallorca"
                  : "on holiday"
              }`}
              loading="lazy"
              width="600"
              height="480"
            />
          ))}
        </div>
        <section
          id="venue"
          className="section wedding-section"
          aria-labelledby="venue-title"
        >
          <div className="container">
            <h2 id="venue-title" className="title is-size-3">
              Venue
            </h2>
            <div className="wedding-photo-grid">
              {venuePhotos.map(([path, alt]) => (
                <img
                  key={path}
                  src={`https://images.squarespace-cdn.com/content/v1/66951d673c45d0653e851970/${path}?format=1000w`}
                  alt={alt}
                  loading="lazy"
                  width="600"
                  height="450"
                />
              ))}
            </div>
            <p className="is-size-7 mb-5">
              Photos courtesy of{" "}
              <a
                href="https://www.delbury.co.uk/"
                target="_blank"
                rel="noreferrer"
              >
                The Barns at Delbury Hall
              </a>
              .
            </p>
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
          id="taxis"
          className="section wedding-section"
          aria-labelledby="taxis-title"
        >
          <div className="container">
            <h2 id="taxis-title" className="title is-size-3">
              Local taxis
            </h2>
            <p>
              Please book your journey to and from The Barns at Delbury Hall in
              advance, especially your ride home. Confirm availability, pickup
              time and fares directly with your chosen company.
            </p>
            <div className="columns is-variable is-5 mt-4">
              {taxis.map((taxi) => (
                <div className="column" key={taxi.name}>
                  <article className="stay-card taxi-card">
                    <h3 className="title is-size-4">{taxi.name}</h3>
                    <p>{taxi.area}</p>
                    <a className="taxi-phone" href={`tel:${taxi.dial}`}>
                      {taxi.phone}
                    </a>
                    <a href={taxi.url} target="_blank" rel="noreferrer">
                      Company details ↗
                    </a>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="gifts"
          className="section wedding-section wedding-gifts"
          aria-labelledby="gifts-title"
        >
          <div className="container has-text-centered">
            <p className="wedding-eyebrow">Our next adventure</p>
            <h2 id="gifts-title" className="title is-size-3">
              Honeymoon contributions
            </h2>
            <p>
              Celebrating with you is the greatest gift. If you would like to
              give us something, a contribution towards our honeymoon would mean
              so much to us.
            </p>
            <p className="mt-3">
              Whether it goes towards a special dinner, a day exploring or a new
              experience together, you’ll be helping us make wonderful memories.
              There is absolutely no expectation to contribute.
            </p>
            <p className="mt-3">
              Please get in touch with us if you’d like to contribute.
            </p>
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
