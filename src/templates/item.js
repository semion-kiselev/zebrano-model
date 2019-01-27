import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {graphql, Link} from 'gatsby';
import Layout from '../components/layout';
import {getNormalizedData} from '../utils';
import {IMAGE_URL, BUCKET_IMAGE} from '../constants';

class Item extends PureComponent {
    render() {
        const {locale, subsection, item} = this.props.pageContext;
        const {data} = this.props;
        const newsItems = getNormalizedData(data.newsItems);

        return (
            <Layout
                locale={locale}
                title={item.title[locale]}
                description={item.description[locale]}
                pageName=""
                newsItems={newsItems}
            >
                <div className="item-content">
                    <div className="item-content__title">
                        <h1 className="item-content__name">
                            {item.name[locale]}
                        </h1>
                        <div className="item-content__subsection">
                            <Link
                                to={`/${locale}/${item.subsection}`}
                                className="item-content__subsection-link"
                            >
                                {subsection.name[locale]}
                            </Link>
                        </div>
                    </div>
                    <div className="item-content__description">
                        {item.text[locale]}
                    </div>
                    <div className="item-content__images">
                        {
                            item.bucketOfImages.map(imageUrl => (
                                <span key={imageUrl} className="item-content__image-big">
                                    <img
                                        className="item-content__image"
                                        src={`${IMAGE_URL}/${BUCKET_IMAGE}/${imageUrl}`}
                                        alt={`${imageUrl}`}
                                    />
                                </span>
                            ))
                        }
                    </div>
                </div>
            </Layout>
        );
    }
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired
};

export default Item;

export const ItemQuery = graphql`
    query ItemQuery($itemsSlugsToDisplayInNews: [String]) {
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
