const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images-v2");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
              langKey
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((edge) => {
      const id = edge.node.id;
      const template = edge.node.frontmatter.templateKey;
      const sections = {
        "location-page": "venue",
        "accomodation-page": "accommodation",
        "rsvp-page": "rsvp",
        "contact-page": "rsvp",
        "activities-page": "venue",
        "faq-page": "venue",
      };
      const isHome =
        template === "index-page" && edge.node.fields.langKey === "en";
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${isHome ? template : "section-redirect"}.js`
        ),
        context: {
          id,
          langKey: edge.node.fields.langKey,
          section: sections[template] || "",
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `layout`,
      node,
      value,
    });
  }
};
