import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';
import cn from 'classnames';
import MenuIcon from './icons/menu';
import {getNavData, navItemChildIsActive} from '../utils';
import Utils from './utils';

class NavMobile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            navIsVisible: false
        };

        this.navMobileTrigger = createRef();
        this.navMobileBody = createRef();

        this.toggleNav = this.toggleNav.bind(this);
        this.hideNav = this.hideNav.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick(e) {
        if (
            this.state.navIsVisible &&
            !this.navMobileBody.current.contains(e.target) &&
            !this.navMobileTrigger.current.contains(e.target)
        ) {
            this.hideNav();
        }
    }

    toggleNav() {
        this.setState({navIsVisible: !this.state.navIsVisible});
    }

    hideNav() {
        this.setState({navIsVisible: false});
    }

    render() {
        const {locale, pageName} = this.props;
        const {navIsVisible} = this.state;
        const navData = getNavData(locale);

        return (
            <nav className="nav-mobile">
                <div
                    className={cn('nav-mobile__icon', {
                        'nav-mobile__icon--active': navIsVisible
                    })}
                    onClick={this.toggleNav}
                    ref={this.navMobileTrigger}

                >
                    <MenuIcon />
                </div>
                <div
                    className="nav-mobile__body"
                    style={{display: navIsVisible ? 'block': 'none'}}
                    ref={this.navMobileBody}
                >
                    <div className="nav-mobile__menu">
                        <ul className="nav-mobile__list">
                            {
                                navData.map((item) => (
                                    <li key={item.id} className={cn('nav-mobile__item', {
                                        'nav-mobile__item--with-children': !!item.children,
                                        'nav-mobile__item--active': item.children ?
                                            navItemChildIsActive(pageName, item.children) : item.pageName === pageName
                                    })}>
                                        {
                                            item.children
                                                ? (
                                                    <>
                                                        <span className="nav-mobile__trigger">
                                                            {item.label}
                                                        </span>
                                                        <ul className="nav-mobile__sublist">
                                                            {
                                                                item.children.map((subitem) => (
                                                                    <li
                                                                        key={subitem.href}
                                                                        className={cn('nav-mobile__subitem', {
                                                                            'nav-mobile__subitem--active': subitem.pageName === pageName
                                                                        })}
                                                                    >
                                                                        <Link to={subitem.href} className="nav-mobile__sublink">
                                                                            {subitem.label}
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </>
                                                )
                                                : (
                                                    <Link to={item.href} className="nav-mobile__link">
                                                        {item.label}
                                                    </Link>
                                                )
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="nav-mobile__utils">
                        <Utils
                            locale={locale}
                            pageName={pageName}
                        />
                    </div>
                </div>
            </nav>
        );
    }
}

NavMobile.propTypes = {
    locale: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired
};

export default NavMobile;
