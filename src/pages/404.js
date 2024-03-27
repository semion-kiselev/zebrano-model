import { Link } from "gatsby";
import { memo } from "react";
import Layout from "../components/layout/layout";
import { DEFAULT_LOCALE, NETLIFY_LOCALE_COOKIE_NAME } from "../constants";
import trans from "../lang";
import { getCookie } from "../utils";
import "./404.css";

const NotFound = memo(() => {
  const locale = getCookie(NETLIFY_LOCALE_COOKIE_NAME) || DEFAULT_LOCALE;
  return (
    <Layout locale="en" title="Not found" description="Not found page" is404>
      <div className="page-404">
        <p className="page-404__message">{trans.NOT_FOUND[locale]}</p>
        <Link to={`/${locale}/`} className="page-404__link">
          {trans.GO_HOME[locale]}
        </Link>
      </div>
    </Layout>
  );
});

export default NotFound;
