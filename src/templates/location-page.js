import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import { getImage } from "gatsby-plugin-image";
import Accordion from "react-bootstrap/Accordion";
import Heading from "../components/Heading";

// eslint-disable-next-line
export const LocationPageTemplate = ({
  title,
  subheading,
  images,
  mainpitch,
  content,
  contentComponent,
  address,
  questions,
  handwrittenTitle,
  handwrittenSubtitle,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(images.home) || images.home;
  const venueImages = [
    {
      src: "https://images.squarespace-cdn.com/content/v1/66951d673c45d0653e851970/ca8e675c-a099-4175-85c4-e290997296ee/delbury_styled-shoot-120.jpg",
      alt: "The grounds at The Barns at Delbury Hall",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/66951d673c45d0653e851970/e6f9a195-b05f-47c0-9f13-d8902fbf7ca9/0401.jpg",
      alt: "Wedding celebrations at Delbury Hall",
    },
    {
      src: "https://images.squarespace-cdn.com/content/v1/66951d673c45d0653e851970/aab0beae-f704-4d1e-ab5d-3e1b9c2ee39b/DSC02967.jpg",
      alt: "The Barns at Delbury Hall wedding venue",
    },
  ];

  return (
    <div>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container is-widescreen">
          <div className="columns mb-0">
            <div className="column is-12-tablet is-offset-0-tablet is-10-desktop is-offset-1-desktop">
              <div className="content has-text-centered">
                <Heading
                  aboveText={handwrittenTitle}
                  belowText={handwrittenSubtitle}
                  colorClass="color-success"
                />
                <p className="subtitle  mb-5">{mainpitch.descriptionTuscany}</p>
              </div>
              <div className="columns is-multiline venue-gallery mb-5">
                {venueImages.map((venueImage) => (
                  <div className="column is-4" key={venueImage.src}>
                    <figure className="venue-gallery-image">
                      <img src={venueImage.src} alt={venueImage.alt} loading="lazy" />
                    </figure>
                  </div>
                ))}
              </div>
              <p className="has-text-centered is-size-7 mb-5">
                Venue images courtesy of {" "}
                <a href="https://www.delbury.co.uk/" target="_blank" rel="noreferrer">
                  The Barns at Delbury Hall
                </a>
                .
              </p>
              <div className="content has-text-centered mb-5">
                <p className="subtitle">{mainpitch.descriptionTenuta}</p>
              </div>
              <div className="column is-12">
                <div className="columns mt-5 mb-5">
                  <div className="column is-4 has-text-centered-mobile">
                    <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                      {title}
                    </h2>
                    <div className="is-size-4">
                      <h3 className="is-size-5">{address.name}</h3>
                      <h4 className="is-size-1 font-northwell push-in color-info">
                        {address.villa}
                      </h4>
                      <p>{address.street}</p>
                      <p>{address.city}</p>
                      <p>{address.country}</p>
                      <a
                        className="is-size-6"
                        href="https://maps.app.goo.gl/cXMuLV4BqcBaxcVo6?g_st=ic"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p>{address.linkToGoogle}</p>
                      </a>
                      <a
                        className="is-size-6"
                        href="https://maps.app.goo.gl/cXMuLV4BqcBaxcVo6?g_st=ic"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p>{address.linkToTenuta}</p>
                      </a>
                    </div>
                  </div>
                  <div className="column is-8">
                    <div className="venue-map-wrapper">
                      <iframe
                        title="The Barns at Delbury Hall map"
                        src="https://www.google.com/maps?q=The%20Barns%20at%20Delbury%20Hall%2C%20Diddlebury%2C%20Craven%20Arms&output=embed"
                        width="100%"
                        height="460"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns mb-5">
            <div className="column is-10-tablet is-offset-1-tablet is-6-desktop is-offset-3-desktop">
              <Accordion>
                {questions.map((item, i) => (
                  <Accordion.Item eventKey={i}>
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    ></Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="columns">
            <div className="column is-12-tablet is-offset-0-tablet is-10-desktop is-offset-1-desktop">
              <PageContent
                className="content has-text-centered"
                content={content}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

LocationPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.object,
  subheading: PropTypes.string,
  content: PropTypes.string,
  mainpitch: PropTypes.object,
  contentComponent: PropTypes.func,
  address: PropTypes.object,
  questions: PropTypes.object,
};

const LocationPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <LocationPageTemplate
        images={post.frontmatter.images}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
        handwrittenTitle={post.frontmatter.handwrittenTitle}
        handwrittenSubtitle={post.frontmatter.handwrittenSubtitle}
        mainpitch={post.frontmatter.mainpitch}
        content={post.html}
        address={post.frontmatter.address}
        questions={post.frontmatter.questions}
      />
    </Layout>
  );
};

LocationPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LocationPage;

export const locationPageQuery = graphql`
  query LocationPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subheading
        handwrittenTitle
        handwrittenSubtitle
        images {
          home {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                layout: FULL_WIDTH
                placeholder: BLURRED
              )
            }
          }
          imageTenuta {
            childImageSharp {
              gatsbyImageData(quality: 80, layout: CONSTRAINED)
            }
          }
          imageVilla {
            childImageSharp {
              gatsbyImageData(quality: 80, layout: CONSTRAINED)
            }
          }
        }
        mainpitch {
          descriptionTuscany
          descriptionTenuta
        }
        address {
          name
          villa
          street
          city
          country
          linkToGoogle
          linkToTenuta
        }
        questions {
          question
          answer
        }
      }
    }
  }
`;
