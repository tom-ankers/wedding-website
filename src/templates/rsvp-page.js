import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImage from "../components/FullWidthImage";
import { getImage } from "gatsby-plugin-image";
import Heading from "../components/Heading";

export const RsvpPageTemplate = ({
  title,
  subheading,
  content,
  description,
  rsvpTitle,
  rsvpSubheading,
  contentComponent,
  image,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(image) || image;

  return (
    <>
      <FullWidthImage img={heroImage} subheading={subheading} />
      <section className="section section--gradient">
        <div className="container is-widescreen">
          <div className="columns">
            <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
              <h2 className="title is-size-3 has-text-weight-bold has-text-centered is-bold-light">
                {title}
              </h2>
              <div className="content has-text-centered mb-5">
                <p className="subtitle">{description}</p>
              </div>
              <Heading
                aboveText={rsvpTitle}
                belowText={rsvpSubheading}
                colorClass="color-primary"
              />

              <form
                className="box rsvp-simple-form"
                action="https://formsubmit.co/thomasjamesankers@gmail.com"
                method="POST"
              >
                <input type="hidden" name="_subject" value="New Tom & Emma wedding RSVP" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://tom-ankers.github.io/wedding-website/en/rsvp/?submitted=true"
                />
                <input type="text" name="_honey" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

                <div className="field">
                  <label className="label" htmlFor="guest-name">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      id="guest-name"
                      name="Name"
                      type="text"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Meal choice</label>
                  <div className="control rsvp-meal-options">
                    <label className="radio mr-5">
                      <input type="radio" name="Meal choice" value="Meat" required /> Meat
                    </label>
                    <label className="radio">
                      <input type="radio" name="Meal choice" value="Vegetarian" required /> Vegetarian
                    </label>
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="dietary-requirements">Dietary requirements</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      id="dietary-requirements"
                      name="Dietary requirements"
                      placeholder="Please tell us about allergies, intolerances or other dietary requirements. Write ‘None’ if there are none."
                      rows="5"
                      required
                    />
                  </div>
                </div>

                <div className="field mt-5 has-text-centered">
                  <button className="button is-primary is-medium" type="submit">
                    Send RSVP
                  </button>
                </div>
                <p className="help has-text-centered mt-4">
                  The first submission will trigger a one-time FormSubmit confirmation email to Tom. Once confirmed, future RSVPs will be delivered automatically.
                </p>
              </form>
            </div>
          </div>
          <PageContent content={content} />
        </div>
      </section>
    </>
  );
};

RsvpPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  content: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  rsvpTitle: PropTypes.string,
  rsvpSubheading: PropTypes.string,
  contentComponent: PropTypes.func,
};

const RsvpPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <RsvpPageTemplate
        image={post.frontmatter.image}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
        description={post.frontmatter.description}
        rsvpTitle={post.frontmatter.rsvpTitle}
        rsvpSubheading={post.frontmatter.rsvpSubheading}
        content={post.html}
      />
    </Layout>
  );
};

RsvpPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RsvpPage;

export const rsvpPageQuery = graphql`
  query RsvpPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subheading
        description
        rsvpTitle
        rsvpSubheading
        image {
          childImageSharp {
            gatsbyImageData(
              quality: 100
              layout: FULL_WIDTH
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`;
