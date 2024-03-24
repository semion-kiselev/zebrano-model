import cn from "classnames";
import { Link } from "gatsby";
import partition from "lodash.partition";
import PropTypes from "prop-types";
import { Fragment, memo, useCallback, useState } from "react";
import Card from "../components/card";
import Layout from "../components/layout";
import LightBox from "../components/light-box";
import { resinKits1To100BoxTypes, slugs } from "../constants";
import { getNavData, getPagesArray } from "../utils";

const Subsection = memo(
  ({ pageContext: { locale, subsection, numPages, currentPage, itemsForNews, items } }) => {
    const [viewedImage, setViewedImage] = useState();

    const handleLoupe = (image) => {
      setViewedImage(image);
    };

    const clearViewedImage = useCallback(() => {
      setViewedImage(undefined);
    }, []);

    const renderItem = (item, locale, subsectionSlug) => (
      <div key={item.article} className="subsection-content__item">
        <Card locale={locale} item={item} subsectionSlug={subsectionSlug} onLoupe={handleLoupe} />
      </div>
    );

    const renderBaseItems = (items, locale, subsectionSlug) => (
      <div className="subsection-content__items">
        {items.map((item) => renderItem(item, locale, subsectionSlug))}
      </div>
    );

    const renderResin1To100Items = (items, locale, subsectionSlug) => {
      const [verticalBoxes, horizontalBoxes] = partition(
        items,
        (item) => item.boxType === resinKits1To100BoxTypes.V
      );

      return (
        <Fragment>
          {verticalBoxes.length > 0 && renderBaseItems(verticalBoxes, locale, subsectionSlug)}
          {horizontalBoxes.length > 0 && renderBaseItems(horizontalBoxes, locale, subsectionSlug)}
        </Fragment>
      );
    };

    const navData = getNavData(locale);

    const pageData = navData
      .filter((navItem) => Boolean(navItem.children))
      .filter((navItem) => navItem.children.some((child) => child.pageName === subsection.slug))[0];

    const url = `/${locale}/${subsection.slug}/`;
    const pages = getPagesArray(numPages);

    const isResin1to100Kits = subsection.slug === slugs.ARMOR_RESIN_KITS_1_100;
    const renderItems = isResin1to100Kits ? renderResin1To100Items : renderBaseItems;

    return (
      <Layout
        locale={locale}
        title={subsection.title[locale]}
        description={subsection.description[locale]}
        pageName={subsection.slug}
        newsItems={itemsForNews}
      >
        <div className="subsection-content">
          <h1 className="subsection-content__title">{pageData.label}</h1>
          <div className="subsection-content__links">
            {pageData.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className={cn("subsection-content__link", {
                  "subsection-content__link--active": child.pageName === subsection.slug,
                })}
              >
                {child.label}
              </Link>
            ))}
          </div>
          {renderItems(items, locale, subsection.slug)}
          {pages.length > 1 && (
            <div className="subsection-content__paginator">
              <div className="paginator">
                {pages.map((page) => (
                  <Link
                    key={page}
                    className={cn("paginator__link", {
                      "paginator__link--active": page === currentPage,
                    })}
                    to={page === 1 ? url : `${url}${page}/`}
                  >
                    {page}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <LightBox
            onRequestClose={clearViewedImage}
            isVisible={Boolean(viewedImage)}
            image={viewedImage}
          />
        </div>
      </Layout>
    );
  }
);

Subsection.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default Subsection;
