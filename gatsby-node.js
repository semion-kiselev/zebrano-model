const path = require('path');

const locales = ['en', 'ru'];

const itemsSlugsToDisplayInNews = [
    '72111-pmg-1'
    '72033-gaz-4-4m',
    '72035-humber-mk4',
    '72036-aec-mk3',
    'SEA031-lebedenko-tank',
    '72118-72-k-1943'
];

const itemsPerPage = 30;

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions;

    return new Promise((resolve, reject) => {
        locales.forEach(locale => {
            createPage({
                path: `${locale}`,
                component: path.resolve('./src/templates/index.js'),
                context: {
                    locale,
                    itemsSlugsToDisplayInNews
                }
            });

            createPage({
                path: `${locale}/where-to-buy`,
                component: path.resolve('./src/templates/where-to-buy.js'),
                context: {
                    locale,
                    itemsSlugsToDisplayInNews
                }
            });

            createPage({
                path: `${locale}/search`,
                component: path.resolve('./src/templates/search.js'),
                context: {
                    locale,
                    itemsSlugsToDisplayInNews
                }
            });
        });

        graphql(`
            {
                sections: allSectionsJson(
                    filter: {
                        visible: {eq: true}
                    }
                ) {
                    edges {
                        node {
                            name {
                                en,
                                ru
                            },
                            slug
                        }
                    }
                }

                subsections: allSubsectionsJson(
                    filter: {
                        visible: {eq: true}
                    }
                ) {
                    edges {
                        node {
                            name {
                                en,
                                ru
                            },
                            title {
                                en,
                                ru
                            },
                            description {
                                en,
                                ru
                            },
                            slug,
                            section
                        }
                    }
                }
                
                items: allItemsJson(
                    filter: {
                        visible: {eq: true}
                    }
                ) {
                    edges {
                        node {
                            title {
                                en,
                                ru
                            },
                            description {
                                en,
                                ru
                            },
                            name {
                                en,
                                ru
                            },
                            text {
                                en,
                                ru
                            },
                            slug,
                            scale,
                            subsection,                        
                            bucketOfImages
                        }
                    }
                }
            }
        `)
            .catch(reject)
            .then(({data: {sections, subsections, items}}) => {
                subsections.edges.forEach(({node: subsection}) => {
                    locales.forEach(locale => {
                        const currentSection = sections.edges.filter(({node: section}) => (
                            section.slug === subsection.section
                        ))[0];

                        const subsectionItems = items.edges.filter(({node: item}) => (
                            item.subsection === subsection.slug
                        ));

                        const numPages = Math.ceil(subsectionItems.length / itemsPerPage);
                        const url = `${locale}/${subsection.slug}`;

                        Array.from({length: numPages}).forEach((_, i) => {
                            createPage({
                                path: i === 0 ? url : `${url}/${i + 1}`,
                                component: path.resolve('./src/templates/subsection.js'),
                                context: {
                                    limit: itemsPerPage,
                                    skip: i * itemsPerPage,
                                    numPages,
                                    currentPage: i + 1,
                                    locale,
                                    section: currentSection.node,
                                    subsection,
                                    subsectionSlug: subsection.slug,
                                    itemsSlugsToDisplayInNews
                                }
                            });
                        });

                        if (subsection.section === 'armor') {
                            subsectionItems.forEach(({node: item}) => {
                                if (item.scale !== '1/100') {
                                    createPage({
                                        path: `${locale}/${subsection.slug}/${item.slug}`,
                                        component: path.resolve('./src/templates/item.js'),
                                        context: {
                                            locale,
                                            subsection,
                                            item,
                                            itemsSlugsToDisplayInNews
                                        }
                                    });
                                }
                            });
                        }
                    });
                });

                resolve();
            })
    });
};
