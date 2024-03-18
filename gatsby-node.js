const path = require("path");

const getNormalizedData = (data) => data.edges.map(({ node }) => node);

const locales = ["en", "ru"];

const itemsSlugsToDisplayInNews = [
  "d-8",
  "fai",
  "SEA033-object-483",
  "bmd3",
  "bmd4",
  "72111-pmg-1",
];

const itemsPerPage = 30;

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        sections: allSectionsJson(filter: { visible: { eq: true } }) {
          edges {
            node {
              name {
                en
                ru
              }
              slug
            }
          }
        }

        subsections: allSubsectionsJson(filter: { visible: { eq: true } }) {
          edges {
            node {
              name {
                en
                ru
              }
              title {
                en
                ru
              }
              description {
                en
                ru
              }
              slug
              section
            }
          }
        }

        items: allItemsJson(filter: { visible: { eq: true } }) {
          edges {
            node {
              article
              type
              title {
                en
                ru
              }
              description {
                en
                ru
              }
              name {
                en
                ru
              }
              text {
                en
                ru
              }
              slug
              scale
              subsection
              lifeCycleState
              newsImage
              bucketOfImages
              boxImage
              boxImageSmall
              boxType
              sortOrder
            }
          }
        }
      }
    `)
      .catch(reject)
      .then(({ data: { sections, subsections, items } }) => {
        const normalizedSections = getNormalizedData(sections);
        const normalizedSubsections = getNormalizedData(subsections);
        const normalizedItems = getNormalizedData(items);

        const itemsForNews = normalizedItems.filter((item) =>
          itemsSlugsToDisplayInNews.includes(item.slug)
        );

        locales.forEach((locale) => {
          createPage({
            path: `${locale}`,
            component: path.resolve("./src/templates/index.js"),
            context: {
              locale,
              itemsForNews,
            },
          });

          createPage({
            path: `${locale}/where-to-buy`,
            component: path.resolve("./src/templates/where-to-buy.js"),
            context: {
              locale,
              itemsForNews,
            },
          });

          createPage({
            path: `${locale}/search`,
            component: path.resolve("./src/templates/search.js"),
            context: {
              locale,
              locales,
              itemsForNews,
              subsections: normalizedSubsections,
            },
          });
        });

        normalizedSubsections.forEach((subsection) => {
          locales.forEach((locale) => {
            const currentSection = normalizedSections.filter(
              (section) => section.slug === subsection.section
            )[0];

            const subsectionItems = normalizedItems.filter(
              (item) => item.subsection === subsection.slug && item.lifeCycleState === "on"
            );

            const sortedItems = [...subsectionItems].sort((a, b) => b.sortOrder - a.sortOrder);

            const numPages = Math.ceil(subsectionItems.length / itemsPerPage);
            const url = `${locale}/${subsection.slug}`;

            Array.from({ length: numPages }).forEach((_, i) => {
              createPage({
                path: i === 0 ? url : `${url}/${i + 1}`,
                component: path.resolve("./src/templates/subsection.js"),
                context: {
                  limit: itemsPerPage,
                  skip: i * itemsPerPage,
                  numPages,
                  currentPage: i + 1,
                  locale,
                  section: currentSection,
                  subsection,
                  subsectionSlug: subsection.slug,
                  itemsForNews,
                  items: sortedItems.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage),
                },
              });
            });

            if (subsection.section === "armor") {
              subsectionItems.forEach((item) => {
                if (item.scale !== "1/100") {
                  createPage({
                    path: `${locale}/${subsection.slug}/${item.slug}`,
                    component: path.resolve("./src/templates/item.js"),
                    context: {
                      locale,
                      subsection,
                      item,
                      itemsForNews,
                    },
                  });
                }
              });
            }
          });
        });

        resolve();
      });
  });
};
