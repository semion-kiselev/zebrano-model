import PropTypes from "prop-types";
import { memo } from "react";
import Helmet from "react-helmet";
import Logo from "../components/icons/logo";
import trans from "../lang";
import "../styles/index.css";
import Nav from "./nav";
import NavMobile from "./nav-mobile";
import Slider from "./slider";
import Utils from "./utils";

const Layout = memo(({ locale, title, description, pageName, newsItems, children }) => (
  <>
    <Helmet title={title}>
      <html lang={locale} />
      <meta name="description" content={description} />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
      <link rel="manifest" href="/favicons/manifest.json" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#d30609" />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />

      <script>
        {`
          var ua = window.navigator.userAgent;
          var msie = ua.indexOf('MSIE');
          if (msie > 0) {
              alert("${trans.OLD_BROWSER_WARN[locale]}");
          }
        `}
      </script>
    </Helmet>
    <section className="page">
      <header className="page__header">
        <div className="page__head">
          <div className="page__logo">
            <div className="logo">
              <Logo />
            </div>
          </div>
          <div className="page__nav-mobile">
            <NavMobile locale={locale} pageName={pageName} />
          </div>
          <div className="page__nav">
            <Nav locale={locale} pageName={pageName} />
          </div>
          <div className="page__utils">
            <Utils locale={locale} pageName={pageName} />
          </div>
        </div>
        <div className="page__slider">
          <Slider locale={locale} newsItems={newsItems} />
        </div>
      </header>
      <div className="page__main">{children}</div>
      <div className="page__footer">Zebrano Model, {new Date().getFullYear()} &copy;</div>
    </section>
  </>
));

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pageName: PropTypes.string,
  newsItems: PropTypes.arrayOf(PropTypes.object),
};

export default Layout;
