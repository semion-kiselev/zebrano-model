import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {Link} from 'gatsby';
import {IMAGE_URL, BOX_IMAGE, SMALL_IMAGE, itemTypes} from '../constants';

class Card extends PureComponent {
    render() {
        const {locale, subsectionSlug, item} = this.props;

        return (
            <div className={cn('card', {
                'card--figures': item.type === itemTypes.FIGURES,
                'card--acc': item.type === itemTypes.ACCESSORIES
            })}>
                <span
                    className="card__image-link"
                    data-link={`${IMAGE_URL}/${BOX_IMAGE}/${item.boxImage}`}
                >
                    <img
                        className="card__thumbnail"
                        src={`${IMAGE_URL}/${BOX_IMAGE}/${SMALL_IMAGE}/${item.boxImageSmall}`}
                        alt={`${item.name[locale]}`}
                    />
                </span>
                <div
                    className="card__name"
                    title={`${item.name[locale]}`}
                >
                    {
                        item.type === itemTypes.ARMOR && item.scale !== '1/100'
                            ? (
                                <Link
                                    className="card__link"
                                    to={`/${locale}/${subsectionSlug}/${item.slug}`}
                                >
                                    {item.name[locale]}
                                </Link>
                            )
                            : (
                                <span>
                                    {item.name[locale]}
                                </span>
                            )
                    }
                </div>
                <div className="card__article">
                    {item.article}
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    locale: PropTypes.string.isRequired,
    subsectionSlug: PropTypes.string.isRequired,
    item: PropTypes.object
};

export default Card;
