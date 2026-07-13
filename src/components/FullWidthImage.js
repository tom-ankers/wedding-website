import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";
import logo from "../img/logo.svg";

export default function FullWidthImage({
  height = 620,
  img,
  title,
  subheading,
  imgPosition = "center 42%",
}) {
  return (
    <section
      className="margin-top-0 header-teaser"
      style={{ minHeight: height, height }}
    >
      {typeof img === "string" ? (
        <img
          className="header-teaser__image"
          src={img}
          alt=""
          style={{ objectPosition: imgPosition }}
        />
      ) : (
        <GatsbyImage
          className="header-teaser__image"
          image={img}
          objectFit="cover"
          objectPosition={imgPosition}
          alt=""
        />
      )}

      <div className="header-teaser__shade" aria-hidden="true" />

      {(logo || title || subheading) && (
        <div className="header-teaser__content">
          {logo && <img className="header-teaser__logo" src={logo} alt="Tom and Emma" />}
          {title && <h1>{title}</h1>}
          {subheading && <h3>{subheading}</h3>}
        </div>
      )}
    </section>
  );
}

FullWidthImage.propTypes = {
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  height: PropTypes.number,
  subheading: PropTypes.string,
  imgPosition: PropTypes.string,
};
