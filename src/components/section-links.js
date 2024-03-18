import { Link } from "gatsby";
import PropTypes from "prop-types";
import { PureComponent } from "react";
import { pageLinks } from "../constants";
import trans from "../lang";

const getSectionLinks = (locale) => [
  {
    id: 1,
    image: "/images/armor-plastic-kits-thumbnail.jpg",
    title: trans.SECTION_LINKS_ARMOR_PLASTIC_TITLE[locale],
    description: trans.SECTION_LINKS_ARMOR_PLASTIC_DESCRIPTION[locale],
    links: [
      { label: "1/72", href: `/${locale}/${pageLinks.armorPlasticKits172}/` },
      { label: "1/35", href: `/${locale}/${pageLinks.armorPlasticKits135}/` },
    ],
  },
  {
    id: 2,
    image: "/images/armor-resin-kits-thumbnail.jpg",
    title: trans.SECTION_LINKS_ARMOR_RESIN_TITLE[locale],
    description: trans.SECTION_LINKS_ARMOR_RESIN_DESCRIPTION[locale],
    links: [
      { label: "1/72", href: `/${locale}/${pageLinks.armorResinKits172}/` },
      { label: "1/100", href: `/${locale}/${pageLinks.armorResinKits1100}/` },
    ],
  },
  {
    id: 3,
    image: "/images/figures-thumbnail.jpg",
    title: trans.SECTION_LINKS_FIGURES_TITLE[locale],
    description: trans.SECTION_LINKS_FIGURES_DESCRIPTION[locale],
    links: [
      { label: "1/72", href: `/${locale}/${pageLinks.figures172}/` },
      { label: "1/43", href: `/${locale}/${pageLinks.figures143}/` },
      { label: "1/35", href: `/${locale}/${pageLinks.figures135}/` },
    ],
  },
  {
    id: 4,
    image: "/images/accessories-thumbnail.jpg",
    title: trans.SECTION_LINKS_ACCESSORIES_TITLE[locale],
    description: trans.SECTION_LINKS_ACCESSORIES_DESCRIPTION[locale],
    links: [
      { label: "1/72", href: `/${locale}/${pageLinks.accessories172}/` },
      { label: "1/35", href: `/${locale}/${pageLinks.accessories135}/` },
    ],
  },
];

class SectionLinks extends PureComponent {
  render() {
    const { locale } = this.props;
    const sectionLinks = getSectionLinks(locale);

    return (
      <div className="section-links">
        {sectionLinks.map(({ id, image, title, description, links }) => (
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
    );
  }
}

SectionLinks.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default SectionLinks;
