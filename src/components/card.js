import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {Link} from 'gatsby';
import {TABLET_MEDIUM_BREAKPOINT, IMAGE_URL, BOX_IMAGE, SMALL_IMAGE, itemTypes, slugs} from '../constants';

class Card extends PureComponent {
    constructor(props) {
        super(props);

        this.handleLoupe = this.handleLoupe.bind(this);
    }

    handleLoupe(image) {
        return () => {
            if (window.innerWidth >= TABLET_MEDIUM_BREAKPOINT) {
                this.props.onLoupe(image);
            }
        }
    }

    render() {
        const {locale, subsectionSlug, item} = this.props;
        const boxImageUrl = `${IMAGE_URL}/${BOX_IMAGE}/${item.boxImage}`;
        const smallBoxImageUrl = subsectionSlug === slugs.ARMOR_RESIN_KITS_1_100
            ? boxImageUrl
            : `${IMAGE_URL}/${BOX_IMAGE}/${SMALL_IMAGE}/${item.boxImageSmall}`;

        return (
            <div className={cn('card', {
                'card--figures': item.type === itemTypes.FIGURES,
                'card--acc': item.type === itemTypes.ACCESSORIES
            })}>
                <img
                    className="card__thumbnail"
                    onClick={this.handleLoupe(boxImageUrl)}
                    src={smallBoxImageUrl}
                    alt={`${item.name[locale]}`}
                />
                <div
                    className="card__name"
                    title={`${item.name[locale]}`}
                >
                    {
                        item.type === itemTypes.ARMOR && item.scale !== '1/100'
                            ? (
                                <Link
                                    className="card__link"
                                    to={`/${locale}/${subsectionSlug}/${item.slug}/`}
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
    item: PropTypes.object,
    onLoupe: PropTypes.func.isRequired
};

export default Card;
