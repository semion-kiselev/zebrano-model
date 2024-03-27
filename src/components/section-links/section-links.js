import { Link } from "gatsby";
import PropTypes from "prop-types";
import { memo } from "react";
import { getSectionLinks } from "../../utils";
import "./section-links.css";

const SectionLinks = memo(({ locale }) => (
  <div className="section-links">
    {getSectionLinks(locale).map(({ id, image, title, description, links }) => (
      <div key={id} className="section-links__col">
        <div className="section-links__item">
          <img
            className="section-links__item-image"
            src={image}
            alt="accessories models thumbnail"
          />
          <div className="section-links__item-title">{title}</div>
          <div className="section-links__item-description">{description}</div>
          <ul className="section-links__list">
            {links.map(({ label, href }) => (
              <li key={href} className="section-links__list-item">
                <Link to={href} className="section-links__link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
));

SectionLinks.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default SectionLinks;
