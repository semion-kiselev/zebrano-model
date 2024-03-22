import cn from "classnames";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { getIfNavItemWithChildrenIsActive, getNavData } from "../utils";

const Nav = memo(({ locale, pageName }) => {
  const [activeMenuItemId, setActiveMenuItemId] = useState(null);
  const navData = getNavData(locale);

  const handleTriggerClick = (id) => () => {
    if (id === activeMenuItemId) {
      setActiveMenuItemId(null);
      return;
    }
    setActiveMenuItemId(id);
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      const activeItemWithChildren = document.querySelector(".nav__item--with-opened-children");

      if (activeItemWithChildren && !activeItemWithChildren.contains(e.target)) {
        setActiveMenuItemId(null);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className="nav">
      <ul className="nav__list">
        {navData.map((item) => (
          <li
            key={item.id}
            className={cn("nav__item", {
              "nav__item--with-opened-children": activeMenuItemId === item.id,
              "nav__item--with-children": !!item.children,
              "nav__item--active": item.children
                ? getIfNavItemWithChildrenIsActive(
                    item.id,
                    item.children,
                    activeMenuItemId,
                    pageName
                  )
                : item.pageName === pageName,
            })}
          >
            {item.children ? (
              <>
                <span className="nav__trigger" onClick={handleTriggerClick(item.id)}>
                  {item.label}
                </span>
                <ul
                  className="nav__sublist"
                  style={{ display: activeMenuItemId === item.id ? "block" : "none" }}
                >
                  {item.children.map((subitem) => (
                    <li
                      key={subitem.href}
                      className={cn("nav__subitem", {
                        "nav__subitem--active": subitem.pageName === pageName,
                      })}
                    >
                      <Link to={subitem.href} className="nav__sublink">
                        {subitem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link to={item.href} className="nav__link">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
});

Nav.propTypes = {
  locale: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
};

export default Nav;
