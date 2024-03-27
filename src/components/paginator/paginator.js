import cn from "classnames";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { memo } from "react";
import "./paginator.css";

const Paginator = memo(({ pages, currentPage, url }) => (
  <div className="paginator">
    {pages.map((page) => (
      <Link
        key={page}
        className={cn("paginator__link", {
          "paginator__link--active": page === currentPage,
        })}
        to={page === 1 ? url : `${url}${page}/`}
      >
        {page}
      </Link>
    ))}
  </div>
));

Paginator.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.number),
  currentPage: PropTypes.number,
  url: PropTypes.string,
};

export default Paginator;
