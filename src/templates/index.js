import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import AboutUs from '../components/about-us';
import SectionLinks from '../components/section-links';
import trans from '../lang';
import {pageLinks} from '../constants';
import {getNormalizedData} from '../utils';

class Home extends PureComponent {
    render() {
        const {locale} = this.props.pageContext;
        const {data} = this.props;
        const newsItems = getNormalizedData(data.newsItems);

        return (
            <Layout
                locale={locale}
                title={trans.HOME_HEAD_TITLE[locale]}
                description={trans.HOME_HEAD_DESCRIPTION[locale]}
                pageName={pageLinks.home}
                newsItems={newsItems}
            >
                <div className="index-content">
                    <div className="index-content__about-us">
                        <AboutUs locale={locale} />
                    </div>
                    <div className="index-content__section-links">
                        <SectionLinks locale={locale} />
                    </div>
                </div>
            </Layout>
        );
    }
}

Home.propTypes = {
    pageContext: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default Home;

export const HomeQuery = graphql`
    query HomeQuery($itemsSlugsToDisplayInNews: [String]) {
        newsItems: allItemsJson (
            filter: {
                slug: {in: $itemsSlugsToDisplayInNews},
                visible: {eq: true}
            }
        ) {
            edges {
                node {
                    ...NewItemsFragment
                }
            }
        }
    }
`;
