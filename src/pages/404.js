import { Link } from "gatsby";
import { memo } from "react";
import Layout from "../components/layout";

const NotFound = memo(() => (
  <Layout locale="en" title="Not found" description="Not found page" is404>
    <div className="page-404">
      <p className="page-404__message">404 Page not found</p>
      <Link to="/" className="page-404__link">
        Let's go home
      </Link>
    </div>
  </Layout>
));

export default NotFound;
