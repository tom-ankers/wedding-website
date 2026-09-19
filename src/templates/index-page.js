import React, { useEffect, useRef } from "react";
import { graphql, withPrefix } from "gatsby";
import Layout from "../components/Layout";
import RsvpForm from "../components/RsvpForm";
import Countdown from "../components/Countdown";

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

const orderOfTheDay = [
  { time: "1:30 pm", dateTime: "13:30", label: "Arrival" },
  { time: "2:00 pm", dateTime: "14:00", label: "Ceremony begins" },
  { time: "2:30 pm", dateTime: "14:30", label: "Drinks reception" },
  {
    time: "4:30 pm",
    dateTime: "16:30",
    label: "Wedding breakfast & speeches",
  },
  { time: "7:30 pm", dateTime: "19:30", label: "Evening reception" },
];

function VenueReveal() {
  const revealRef = useRef(null);

  useEffect(() => {
    const reveal = revealRef.current;
    if (!reveal || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frame;
    const update = () => {
      frame = undefined;
      const bounds = reveal.getBoundingClientRect();
      const distance = Math.max(reveal.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-bounds.top / distance, 0), 1);
      const isPortraitMobile = window.matchMedia("(max-width: 600px)").matches;
      reveal.style.setProperty("--reveal-progress", progress.toFixed(3));
      reveal.style.setProperty(
        "--venue-scale",
        (isPortraitMobile ? 1 : 1.08 + progress * 0.3).toFixed(3)
      );
      reveal.style.setProperty(
        "--venue-filter",
        `saturate(${(0.9 + progress * 0.1).toFixed(3)})`
      );
      reveal.style.setProperty(
        "--floral-opacity",
        Math.max(1 - progress * 0.78, 0.22).toFixed(3)
      );
      reveal.style.setProperty("--floral-scale", (1 + progress * 0.46).toFixed(3));
      const copyOpacity = Math.min(Math.max((progress - 0.12) * 2.8, 0), 1);
      reveal.style.setProperty("--copy-opacity", copyOpacity.toFixed(3));
      reveal.style.setProperty("--copy-shift", `${((1 - copyOpacity) * 2).toFixed(2)}rem`);
      reveal.style.setProperty("--cue-opacity", Math.max(1 - progress * 3, 0).toFixed(3));
      reveal.style.setProperty("--shade-opacity", (0.55 - progress * 0.16).toFixed(3));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={revealRef}
      className="venue-reveal"
      aria-labelledby="venue-reveal-title"
    >
      <div className="venue-reveal__sticky">
        <img
          className="venue-reveal__image"
          src={withPrefix("/img/delbury-hall-watercolour.png")}
          alt="Watercolour aerial illustration of Delbury Hall, its wedding barns, lakes and surrounding countryside"
          loading="lazy"
          width="1672"
          height="940"
        />
        <div className="venue-reveal__shade" aria-hidden="true" />
        <picture className="venue-reveal__floral">
          <source
            media="(max-width: 600px)"
            srcSet={withPrefix("/img/watercolor-floral-frame-mobile.png")}
          />
          <img
            src={withPrefix("/img/watercolor-floral-frame.png")}
            alt=""
            width="1656"
            height="950"
          />
        </picture>
        <div className="venue-reveal__copy">
          <h2 id="venue-reveal-title">The Barns at Delbury Hall</h2>
        </div>
        <span className="venue-reveal__cue" aria-hidden="true">
          <span />
        </span>
      </div>
    </section>
  );
}

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
          {["mallorca", "wisteria", "holiday"].map((photo) => (
            <img
              key={photo}
              src={withPrefix(`/img/tom-emma-${photo}.jpg`)}
              alt={`Tom and Emma ${
                photo === "wisteria"
                  ? "beneath flowering wisteria"
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
          id="order"
          className="section wedding-section order-section"
          aria-labelledby="order-title"
        >
          <div className="container has-text-centered">
            <p className="wedding-eyebrow">Tuesday · 17 August 2027</p>
            <h2 id="order-title" className="title is-size-3">
              Order of the day
            </h2>
            <ol className="day-timeline">
              {orderOfTheDay.map((event, index) => (
                <li
                  key={event.dateTime}
                  style={{ "--event-rotation": `${45 + index * 18}deg` }}
                >
                  <time dateTime={event.dateTime}>{event.time}</time>
                  <span className="day-timeline__flower" aria-hidden="true" />
                  <span className="day-timeline__label">{event.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <VenueReveal />
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
              <p className="mt-3">
                Use your invitation code to RSVP for your whole party.
              </p>
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
