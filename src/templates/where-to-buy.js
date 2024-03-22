import PropTypes from "prop-types";
import { memo } from "react";
import Layout from "../components/layout";
import { pageLinks, shops } from "../constants";
import trans from "../lang";

const WhereToBuy = memo(({ pageContext: { locale, itemsForNews } }) => (
  <Layout
    locale={locale}
    title={trans.WHERE_TO_BUY_HEAD_TITLE[locale]}
    description={trans.WHERE_TO_BUY_HEAD_DESCRIPTION[locale]}
    pageName={pageLinks.whereToBuy}
    newsItems={itemsForNews}
  >
    <div className="where-to-buy-content">
      <h1 className="where-to-buy-content__title">{trans.WHERE_TO_BUY_PAGE_TITLE[locale]}</h1>
      <div className="where-to-buy-content__main">
        <div className="where-to-buy">
          <div
            className="where-to-buy__wholesale"
            dangerouslySetInnerHTML={{ __html: trans.WHERE_TO_BUY_WHOLESALE[locale] }}
          />
          <div className="where-to-buy__retail">{trans.WHERE_TO_BUY_RETAIL[locale]}</div>
          <ul className="where-to-buy__list">
            {shops.map(
              (shopInfo) =>
                shopInfo.name[locale] && (
                  <li key={shopInfo.name[locale]} className="where-to-buy__item">
                    {shopInfo.link[locale] ? (
                      <a
                        href={`${shopInfo.link[locale]}`}
                        className="where-to-buy__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shopInfo.name[locale]}
                      </a>
                    ) : (
                      <span>{shopInfo.name[locale]}</span>
                    )}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  </Layout>
));

WhereToBuy.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default WhereToBuy;
