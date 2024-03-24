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

const Card = memo(({ locale, subsectionSlug, item, onLoupe }) => {
  const getLoupeHandler = (image) => () => {
    if (window.innerWidth >= TABLET_MEDIUM_BREAKPOINT) {
      onLoupe(image);
    }
  };

  const boxImageUrl = `${IMAGE_URL}/${BOX_IMAGE}/${item.boxImage}`;

  const smallBoxImageUrl =
    subsectionSlug === slugs.ARMOR_RESIN_KITS_1_100
      ? boxImageUrl
      : `${IMAGE_URL}/${BOX_IMAGE}/${SMALL_IMAGE}/${item.boxImageSmall}`;

  return (
    <div
      className={cn("card", {
        "card--figures": item.type === itemTypes.FIGURES,
        "card--acc": item.type === itemTypes.ACCESSORIES,
      })}
    >
      <img
        className="card__thumbnail"
        onClick={getLoupeHandler(boxImageUrl)}
        src={smallBoxImageUrl}
        alt={`${item.name[locale]}`}
      />
      <div className="card__name" title={`${item.name[locale]}`}>
        {item.type === itemTypes.ARMOR && item.scale !== "1/100" ? (
          <Link className="card__link" to={`/${locale}/${subsectionSlug}/${item.slug}/`}>
            {item.name[locale]}
          </Link>
        ) : (
          <span>{item.name[locale]}</span>
        )}
      </div>
      <div className="card__article">{item.article}</div>
    </div>
  );
});

Card.propTypes = {
  locale: PropTypes.string.isRequired,
  subsectionSlug: PropTypes.string.isRequired,
  item: PropTypes.object,
  onLoupe: PropTypes.func.isRequired,
};

export default Card;
