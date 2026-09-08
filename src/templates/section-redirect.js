import React, { useEffect } from "react";
import { withPrefix } from "gatsby";

export default function SectionRedirect({ pageContext }) {
  const target = `${withPrefix("/en/")}${
    pageContext.section ? `#${pageContext.section}` : ""
  }`;
  useEffect(() => {
    window.location.replace(
      `${withPrefix("/en/")}${window.location.search}${
        pageContext.section ? `#${pageContext.section}` : window.location.hash
      }`
    );
  }, [pageContext.section]);
  return (
    <p>
      Wedding details have moved.{" "}
      <a href={target}>Continue to our wedding page</a>.
    </p>
  );
}
