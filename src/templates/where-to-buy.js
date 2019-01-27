import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import trans from '../lang';
import {pageLinks, shops} from '../constants';
import {getNormalizedData} from '../utils';

class WhereToBuy extends PureComponent {
    render() {
        const {locale} = this.props.pageContext;
        const {data} = this.props;
        const newsItems = getNormalizedData(data.newsItems);

        return (
            <Layout
                locale={locale}
                title={trans.WHERE_TO_BUY_HEAD_TITLE[locale]}
                description={trans.WHERE_TO_BUY_HEAD_DESCRIPTION[locale]}
                pageName={pageLinks.whereToBuy}
                newsItems={newsItems}
            >
                <div className="where-to-buy-content">
                    <h1 className="where-to-buy-content__title">
                        {trans.WHERE_TO_BUY_PAGE_TITLE[locale]}
                    </h1>
                    <div className="where-to-buy-content__main">
                        <div className="where-to-buy">
                            <div
                                className="where-to-buy__wholesale"
                                dangerouslySetInnerHTML={{__html: trans.WHERE_TO_BUY_WHOLESALE[locale]}}
                            />
                            <div className="where-to-buy__retail">
                                {trans.WHERE_TO_BUY_RETAIL[locale]}
                            </div>
                            <ul className="where-to-buy__list">
                                {
                                    shops.map(shopInfo => (
                                        shopInfo.name[locale] &&
                                        (
                                            <li className="where-to-buy__item">
                                                {
                                                    shopInfo.link[locale]
                                                    ? (
                                                        <a
                                                            href={`${shopInfo.link[locale]}`}
                                                            className="where-to-buy__link"
                                                        >
                                                            {shopInfo.name[locale]}
                                                        </a>
                                                    )
                                                    : (
                                                        <span>{shopInfo.name[locale]}</span>
                                                    )
                                                }
                                            </li>
                                        )
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

WhereToBuy.propTypes = {
    pageContext: PropTypes.object.isRequired
};

export default WhereToBuy;

export const WhereToBuyQuery = graphql`
    query WhereToBuyQuery($itemsSlugsToDisplayInNews: [String]) {
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
