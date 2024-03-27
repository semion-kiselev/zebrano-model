import { Location } from "@reach/router";
import cn from "classnames";
import { Link, navigate } from "gatsby";
import PropTypes from "prop-types";
import { memo } from "react";
import { NETLIFY_LOCALE_COOKIE_NAME, pageLinks } from "../../constants";
import trans from "../../lang";
import { setCookie } from "../../utils";
import SearchIcon from "../icons/search";
import "./utils.css";

const Utils = memo(({ locale, pageName }) => {
  const changeLocale =
    ({ pathname }) =>
    () => {
      const newLocale = locale === "ru" ? "en" : "ru";
      setCookie(NETLIFY_LOCALE_COOKIE_NAME, newLocale, { path: "/", expires: 5184000 });

      const localeReg = new RegExp(`/${locale}`);
      const newLocation = pathname.replace(localeReg, `/${newLocale}`);
      navigate(newLocation);
    };

  return (
    <div className="utils">
      <Location>
        {({ location }) => (
          <ul className="utils__list">
            <li className="utils__item utils__item--locale" onClick={changeLocale(location)}>
              {trans.CHANGE_LOCALE[locale]}
            </li>
            <li
              className={cn("utils__item utils__item--search", {
                "utils__item--active": pageName === pageLinks.search,
              })}
            >
              <i className="utils__icon">
                <SearchIcon />
              </i>
              <Link className="utils__search-link" to={`/${locale}/${pageLinks.search}/`}>
                {trans.SEARCH_SEARCH[locale]}
              </Link>
            </li>
          </ul>
        )}
      </Location>
    </div>
  );
});

Utils.propTypes = {
  locale: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
};

export default Utils;
