import PropTypes from "prop-types";
import { memo } from "react";
import Layout from "../../components/layout/layout";
import WhereToBuyComponent from "../../components/where-to-buy/where-to-buy";
import { pageLinks } from "../../constants";
import trans from "../../lang";
import "./where-to-buy.css";

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
        <WhereToBuyComponent locale={locale} />
      </div>
    </div>
  </Layout>
));

WhereToBuy.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default WhereToBuy;
