import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {Link} from 'gatsby';
import {IMAGE_URL, BOX_IMAGE, SMALL_IMAGE, itemTypes} from '../constants';

class SearchCard extends PureComponent {
    render() {
        const {locale, item, subsection} = this.props;

        return (
            <div className="search-card">
                <div className="search-card__thumbnail-wrapper">
                    <span
                        className="search-card__image-link"
                        data-link={`${IMAGE_URL}/${BOX_IMAGE}/${item.boxImage}`}
                    >
                        <img
                            className="search-card__thumbnail"
                            src={`${IMAGE_URL}/${BOX_IMAGE}/${SMALL_IMAGE}/${item.boxImageSmall}`}
                            alt={`${item.name[locale]}`}
                        />
                    </span>
                </div>
                <div className="search-card__main">
                    <div className="search-card__article">
                        {item.article}
                    </div>
                    <div className="search-card__name">
                        {
                            item.type === itemTypes.ARMOR && item.scale !== '1/100'
                                ? (
                                    <Link
                                        className="search-card__link"
                                        to={`/${locale}/${item.subsection}/${item.slug}`}
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
                    <div className={cn('search-card__subsection', {
                        'search-card__subsection--sm-indent': item.type !== itemTypes.ARMOR
                    })}>
                        <Link
                            className="search-card__subsection-link"
                            to={`/${locale}/${item.subsection}`}
                        >
                            {subsection.name[locale]}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

SearchCard.propTypes = {
    locale: PropTypes.string.isRequired,
    item: PropTypes.object,
    subsection: PropTypes.object
};

export default SearchCard;
