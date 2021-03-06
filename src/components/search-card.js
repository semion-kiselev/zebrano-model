import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {Link} from 'gatsby';
import {IMAGE_URL, BOX_IMAGE, SMALL_IMAGE, itemTypes, TABLET_MEDIUM_BREAKPOINT} from '../constants';

class SearchCard extends PureComponent {
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
        const {locale, item, subsection} = this.props;

        return (
            <div className="search-card">
                <div className="search-card__thumbnail-wrapper">
                    <span className="search-card__image-link">
                        <img
                            className="search-card__thumbnail"
                            onClick={this.handleLoupe(`${IMAGE_URL}/${BOX_IMAGE}/${item.boxImage}`)}
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
                                        to={`/${locale}/${item.subsection}/${item.slug}/`}
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
                            to={`/${locale}/${item.subsection}/`}
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
    subsection: PropTypes.object,
    onLoupe: PropTypes.func.isRequired
};

export default SearchCard;
