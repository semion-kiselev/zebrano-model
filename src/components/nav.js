import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';
import cn from 'classnames';
import {getNavData, navItemChildIsActive} from '../utils';

const navItemWithChildrenIsActive = (itemId, itemChildren, activeMenuItemId, pageName) => {
    const childIsActive = navItemChildIsActive(pageName, itemChildren);
    return childIsActive || activeMenuItemId === itemId;
};

class Nav extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeMenuItemId: null
        };

        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleTriggerClick = this.handleTriggerClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick(e) {
        const activeItemWithChildren = document.querySelector('.nav__item--with-opened-children');

        if (activeItemWithChildren && !activeItemWithChildren.contains(e.target)) {
            this.clearActiveMenuItem();
        }
    }

    handleTriggerClick(id) {
        return () => {
            console.log('trigger click');
            const {activeMenuItemId} = this.state;
            if (id === activeMenuItemId) {
                this.clearActiveMenuItem();
                return;
            }
            this.setActiveMenuItem(id);
        }
    }

    setActiveMenuItem(id) {
        this.setState({activeMenuItemId: id});
    }

    clearActiveMenuItem() {
        this.setState({activeMenuItemId: null});
    }

    render() {
        const {locale, pageName} = this.props;
        const {activeMenuItemId} = this.state;
        const navData = getNavData(locale);

        return (
            <nav className="nav">
                <ul className="nav__list">
                    {
                        navData.map((item) => (
                            <li key={item.id} className={cn('nav__item', {
                                'nav__item--with-opened-children': activeMenuItemId === item.id,
                                'nav__item--with-children': !!item.children,
                                'nav__item--active': item.children
                                    ? navItemWithChildrenIsActive(item.id, item.children, activeMenuItemId, pageName)
                                    : item.pageName === pageName
                            })}>
                                {
                                    item.children
                                        ? (
                                            <>
                                                <span
                                                    className="nav__trigger"
                                                    onClick={this.handleTriggerClick(item.id)}
                                                >
                                                    {item.label}
                                                </span>
                                                <ul
                                                    className="nav__sublist"
                                                    style={{display: activeMenuItemId === item.id ? 'block' : 'none'}}
                                                >
                                                    {
                                                        item.children.map((subitem) => (
                                                            <li
                                                                key={subitem.href}
                                                                className={cn('nav__subitem', {
                                                                    'nav__subitem--active': subitem.pageName === pageName
                                                                })}
                                                            >
                                                                <Link to={subitem.href} className="nav__sublink">
                                                                    {subitem.label}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </>
                                        )
                                        : (
                                            <Link to={item.href} className="nav__link">
                                                {item.label}
                                            </Link>
                                        )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>
        );
    }
}

Nav.propTypes = {
    locale: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired
};

export default Nav;
