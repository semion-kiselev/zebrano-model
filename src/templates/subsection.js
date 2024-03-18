import cn from "classnames";
import { Link } from "gatsby";
import partition from "lodash.partition";
import PropTypes from "prop-types";
import { Fragment, PureComponent } from "react";
import Card from "../components/card";
import Layout from "../components/layout";
import LightBox from "../components/light-box";
import { resinKits1To100BoxTypes, slugs } from "../constants";
import { getNavData, getPagesArray } from "../utils";

class Subsection extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      viewedImage: undefined,
    };

    this.handleLoupe = this.handleLoupe.bind(this);
    this.clearViewedImage = this.clearViewedImage.bind(this);
  }

  handleLoupe(image) {
    this.setState({ viewedImage: image });
  }

  clearViewedImage() {
    this.setState({ viewedImage: undefined });
  }

  renderItem(item, locale, subsectionSlug) {
    return (
      <div key={item.article} className="subsection-content__item">
        <Card
          locale={locale}
          item={item}
          subsectionSlug={subsectionSlug}
          onLoupe={this.handleLoupe}
        />
      </div>
    );
  }

  renderItems(items, locale, subsectionSlug) {
    return (
      <div className="subsection-content__items">
        {items.map((item) => this.renderItem(item, locale, subsectionSlug))}
      </div>
    );
  }

  renderResin1To100Items(items, locale, subsectionSlug) {
    const [verticalBoxes, horizontalBoxes] = partition(
      items,
      (item) => item.boxType === resinKits1To100BoxTypes.V
    );

    return (
      <Fragment>
        {verticalBoxes.length > 0 && this.renderItems(verticalBoxes, locale, subsectionSlug)}
        {horizontalBoxes.length > 0 && this.renderItems(horizontalBoxes, locale, subsectionSlug)}
      </Fragment>
    );
  }

  render() {
    const { locale, subsection, numPages, currentPage, itemsForNews, items } =
      this.props.pageContext;
    const { viewedImage } = this.state;
    const navData = getNavData(locale);
    const pageData = navData
      .filter((navItem) => Boolean(navItem.children))
      .filter((navItem) => navItem.children.some((child) => child.pageName === subsection.slug))[0];
    const url = `/${locale}/${subsection.slug}/`;
    const pages = getPagesArray(numPages);

    const isResin1to100Kits = subsection.slug === slugs.ARMOR_RESIN_KITS_1_100;
    const renderItems = isResin1to100Kits ? this.renderResin1To100Items : this.renderItems;

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
          {renderItems.apply(this, [items, locale, subsection.slug])}
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
            onRequestClose={this.clearViewedImage}
            isVisible={Boolean(viewedImage)}
            image={viewedImage}
          />
        </div>
      </Layout>
    );
  }
}

Subsection.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default Subsection;
