import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import { PureComponent, createRef } from "react";
import Layout from "../components/layout";
import LightBox from "../components/light-box";
import SearchCard from "../components/search-card";
import {
  SEARCH_INPUT_DEBOUNCE_DELAY,
  SEARCH_INPUT_MAX_LENGTH,
  SEARCH_ITEMS_MAX_QTY,
  pageLinks,
} from "../constants";
import trans from "../lang";
import { getJSON } from "../utils";

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      error: null,
      items: [],
      viewedImage: undefined,
    };

    this.input = createRef();
    this.handleQuery = this.handleQuery.bind(this);
    this.handleQuerySuccess = this.handleQuerySuccess.bind(this);
    this.handleQueryError = this.handleQueryError.bind(this);
    this.handleLoupe = this.handleLoupe.bind(this);
    this.clearViewedImage = this.clearViewedImage.bind(this);
  }

  handleLoupe(image) {
    this.setState({ viewedImage: image });
  }

  clearViewedImage() {
    this.setState({ viewedImage: undefined });
  }

  requestItems = debounce(
    () => getJSON("/items.json", this.handleQuerySuccess, this.handleQueryError),
    SEARCH_INPUT_DEBOUNCE_DELAY
  );

  handleQuerySuccess(itemsJsonString) {
    const { locales } = this.props.pageContext;
    const { query } = this.state;

    if (query.length === 0) {
      return;
    }

    const items = JSON.parse(itemsJsonString);

    if (!Array.isArray(items) || items.length === 0) {
      this.setState({
        error: true,
        items: [],
      });
      return;
    }

    const q = query.toLowerCase();

    const filteredItems = items.filter(
      ({ article, name, visible }) =>
        (article.toLowerCase().indexOf(q) > -1 ||
          locales.some((locale) => name[locale].toLowerCase().indexOf(q) > -1)) &&
        visible
    );

    if (filteredItems.length === 0) {
      this.setState({ items: [] });
      return;
    }

    this.setState({ items: filteredItems.slice(0, SEARCH_ITEMS_MAX_QTY) });
  }

  handleQueryError() {
    this.setState({ error: true });
  }

  handleQuery(e) {
    const query = e.target.value;
    this.setState({ query });

    if (query.trim().length === 0) {
      this.setState({
        query: "",
        items: [],
      });
      return;
    }

    this.requestItems();
  }

  render() {
    const { locale, subsections, itemsForNews } = this.props.pageContext;
    const { query, items, error, viewedImage } = this.state;
    const subsectionsMap = subsections.reduce((acc, subsection) => {
      acc[subsection.slug] = subsection;
      return acc;
    }, {});

    return (
      <Layout
        locale={locale}
        title={trans.SEARCH_HEAD_TITLE[locale]}
        description={trans.SEARCH_HEAD_DESCRIPTION[locale]}
        pageName={pageLinks.search}
        newsItems={itemsForNews}
      >
        <div className="search-content">
          <div className="search-content__title">
            <input
              ref={this.input}
              className="search-content__input"
              type="text"
              placeholder={trans.SEARCH_PAGE_TITLE[locale]}
              name="searchInput"
              maxLength={SEARCH_INPUT_MAX_LENGTH}
              value={query}
              onChange={this.handleQuery}
            />
          </div>
          {error && <div className="search-content__no-results">{trans.SEARCH_ERROR[locale]}</div>}
          {items.length > 0 ? (
            <div className="search-content__items">
              {items.map((item) => (
                <div key={item.article} className="search-content__item">
                  <SearchCard
                    locale={locale}
                    item={item}
                    subsection={subsectionsMap[item.subsection]}
                    onLoupe={this.handleLoupe}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="search-content__no-results">{trans.SEARCH_NO_RESULTS[locale]}</div>
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

Search.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default Search;
