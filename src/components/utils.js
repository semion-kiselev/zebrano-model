import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {Link, navigate} from 'gatsby';
import {Location} from '@reach/router';
import trans from '../lang';
import {pageLinks, NETLIFY_LOCALE_COOKIE_NAME} from '../constants';
import {setCookie} from '../utils';
import SearchIcon from './icons/search';

class Utils extends PureComponent {
    constructor(props) {
        super(props);

        this.changeLocale = this.changeLocale.bind(this);
    }

    changeLocale({pathname}) {
        return () => {
            const {locale: currentLocale} = this.props;
            const newLocale = currentLocale === 'ru' ? 'en' : 'ru';
            setCookie(NETLIFY_LOCALE_COOKIE_NAME, newLocale, {path: '/', expires: 5184000});

            const localeReg = new RegExp(`/${currentLocale}`);
            const newLocation = pathname.replace(localeReg, `/${newLocale}`);
            navigate(newLocation);
        }
    }

    render() {
        const {locale, pageName} = this.props;

        return (
            <div className="utils">
                <Location>
                    {({location}) => (
                        <ul className="utils__list">
                            <li
                                className="utils__item utils__item--locale"
                                onClick={this.changeLocale(location)}
                            >
                                {trans.CHANGE_LOCALE[locale]}
                            </li>
                            <li className={cn('utils__item utils__item--search', {
                                'utils__item--active': pageName === pageLinks.search
                            })}>
                                <i className="utils__icon">
                                    <SearchIcon />
                                </i>
                                <Link
                                    className="utils__search-link"
                                    to={`/${locale}/${pageLinks.search}/`}
                                >
                                    {trans.SEARCH_SEARCH[locale]}
                                </Link>
                            </li>
                        </ul>
                    )}
                </Location>
            </div>
        );
    }
}

Utils.propTypes = {
    locale: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired
};

export default Utils;
