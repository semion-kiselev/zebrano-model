import { Link } from "gatsby";
import PropTypes from "prop-types";
import { memo } from "react";
import trans from "../lang";

const AboutUs = memo(({ locale }) => (
  <div className="about-us">
    <h1 className="about-us__title">{trans.ABOUT_US_PAGE_TITLE[locale]}</h1>
    <p className="about-us__block">{trans.ABOUT_US_MAIN_PURPOSE[locale]}</p>
    <p className="about-us__block">{trans.ABOUT_US_WE_ISSUE[locale]}</p>
    <p className="about-us__block">
      {trans.ABOUT_US_WE_SELL[locale]}{" "}
      <Link to={`/${locale}/where-to-buy/`} className="about-us__link">
        {trans.ABOUT_US_PARTNERS[locale]}
      </Link>
      .
    </p>
  </div>
));

AboutUs.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default AboutUs;
