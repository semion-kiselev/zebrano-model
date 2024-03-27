import PropTypes from "prop-types";
import { memo } from "react";
import { shops } from "../../constants";
import trans from "../../lang";
import "./where-to-buy.css";

const WhereToBuy = memo(({ locale }) => (
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
));

WhereToBuy.propTypes = {
  locale: PropTypes.string,
};

export default WhereToBuy;
