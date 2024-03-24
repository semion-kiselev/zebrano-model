import cn from "classnames";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { memo } from "react";
import {
  BOX_IMAGE,
  IMAGE_URL,
  SMALL_IMAGE,
  TABLET_MEDIUM_BREAKPOINT,
  itemTypes,
  slugs,
} from "../constants";

const SearchCard = memo(({ locale, item, subsection, onLoupe }) => {
  const getLoupeHandler = (image) => () => {
    if (window.innerWidth >= TABLET_MEDIUM_BREAKPOINT) {
      onLoupe(image);
    }
  };

  const boxImageUrl = `${IMAGE_URL}/${BOX_IMAGE}/${item.boxImage}`;

  const smallBoxImageUrl =
    subsection.slug === slugs.ARMOR_RESIN_KITS_1_100
      ? boxImageUrl
      : `${IMAGE_URL}/${BOX_IMAGE}/${SMALL_IMAGE}/${item.boxImageSmall}`;

  return (
    <div className="search-card">
      <div className="search-card__thumbnail-wrapper">
        <span className="search-card__image-link">
          <img
            className="search-card__thumbnail"
            onClick={getLoupeHandler(boxImageUrl)}
            src={smallBoxImageUrl}
            alt={`${item.name[locale]}`}
          />
        </span>
      </div>
      <div className="search-card__main">
        <div className="search-card__article">{item.article}</div>
        <div className="search-card__name">
          {item.type === itemTypes.ARMOR && item.scale !== "1/100" ? (
            <Link className="search-card__link" to={`/${locale}/${item.subsection}/${item.slug}/`}>
              {item.name[locale]}
            </Link>
          ) : (
            <span>{item.name[locale]}</span>
          )}
        </div>
        <div
          className={cn("search-card__subsection", {
            "search-card__subsection--sm-indent": item.type !== itemTypes.ARMOR,
          })}
        >
          <Link className="search-card__subsection-link" to={`/${locale}/${item.subsection}/`}>
            {subsection.name[locale]}
          </Link>
        </div>
      </div>
    </div>
  );
});

SearchCard.propTypes = {
  locale: PropTypes.string.isRequired,
  item: PropTypes.object,
  subsection: PropTypes.object,
  onLoupe: PropTypes.func.isRequired,
};

export default SearchCard;
