import cn from "classnames";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { memo, useEffect, useRef, useState } from "react";
import { getNavData, navItemChildIsActive } from "../utils";
import MenuIcon from "./icons/menu";
import Utils from "./utils";

const NavMobile = memo(({ locale, pageName }) => {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const [documentClickEvent, setDocumentClickEvent] = useState(null);

  const navMobileTriggerRef = useRef(null);
  const navMobileBodyRef = useRef(null);

  const navData = getNavData(locale);

  const toggleNav = () => {
    setNavIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (
      documentClickEvent &&
      navIsVisible &&
      !navMobileBodyRef.current.contains(documentClickEvent.target) &&
      !navMobileTriggerRef.current.contains(documentClickEvent.target)
    ) {
      setNavIsVisible(false);
    } else {
      setDocumentClickEvent(null);
    }
  }, [documentClickEvent, navIsVisible]);

  useEffect(() => {
    const notifyDocumentClick = (e) => setDocumentClickEvent(e);
    document.addEventListener("click", notifyDocumentClick);
    return () => {
      document.removeEventListener("click", notifyDocumentClick);
    };
  }, []);

  return (
    <nav className="nav-mobile">
      <div
        className={cn("nav-mobile__icon", {
          "nav-mobile__icon--active": navIsVisible,
        })}
        onClick={toggleNav}
        ref={navMobileTriggerRef}
      >
        <MenuIcon />
      </div>
      <div
        className="nav-mobile__body"
        style={{ display: navIsVisible ? "block" : "none" }}
        ref={navMobileBodyRef}
      >
        <div className="nav-mobile__menu">
          <ul className="nav-mobile__list">
            {navData.map((item) => (
              <li
                key={item.id}
                className={cn("nav-mobile__item", {
                  "nav-mobile__item--with-children": !!item.children,
                  "nav-mobile__item--active": item.children
                    ? navItemChildIsActive(pageName, item.children)
                    : item.pageName === pageName,
                })}
              >
                {item.children ? (
                  <>
                    <span className="nav-mobile__trigger">{item.label}</span>
                    <ul className="nav-mobile__sublist">
                      {item.children.map((subitem) => (
                        <li
                          key={subitem.href}
                          className={cn("nav-mobile__subitem", {
                            "nav-mobile__subitem--active": subitem.pageName === pageName,
                          })}
                        >
                          <Link to={subitem.href} className="nav-mobile__sublink">
                            {subitem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={item.href} className="nav-mobile__link">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-mobile__utils">
          <Utils locale={locale} pageName={pageName} />
        </div>
      </div>
    </nav>
  );
});

NavMobile.propTypes = {
  locale: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
};

export default NavMobile;
