import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import { memo, useState } from "react";
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

// todo: save items after first request
// todo: check 1/100 search results

const requestItems = debounce(
  (onSuccess, onError) => getJSON("/items.json", onSuccess, onError),
  SEARCH_INPUT_DEBOUNCE_DELAY
);

const Search = memo(({ pageContext: { locales, locale, subsections, itemsForNews } }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [viewedImage, setViewedImage] = useState();

  const handleLoupe = (image) => {
    setViewedImage(image);
  };

  const clearViewedImage = () => {
    setViewedImage(undefined);
  };

  const onQuerySuccess = (itemsJsonString) => {
    if (query.length === 0) {
      return;
    }

    const items = JSON.parse(itemsJsonString);

    if (!Array.isArray(items) || items.length === 0) {
      setError(true);
      setItems([]);
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
      setItems([]);
      return;
    }

    setItems(filteredItems.slice(0, SEARCH_ITEMS_MAX_QTY));
  };

  const onQueryError = () => {
    setError(true);
  };

  const handleQuery = ({ target: { value } }) => {
    if (value.trim().length === 0) {
      setQuery("");
      setItems([]);
      return;
    }

    setQuery(value);
    requestItems(onQuerySuccess, onQueryError);
  };

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
            className="search-content__input"
            type="text"
            placeholder={trans.SEARCH_PAGE_TITLE[locale]}
            name="searchInput"
            maxLength={SEARCH_INPUT_MAX_LENGTH}
            value={query}
            onChange={handleQuery}
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
                  onLoupe={handleLoupe}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="search-content__no-results">{trans.SEARCH_NO_RESULTS[locale]}</div>
        )}
        <LightBox
          onRequestClose={clearViewedImage}
          isVisible={Boolean(viewedImage)}
          image={viewedImage}
        />
      </div>
    </Layout>
  );
});

Search.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default Search;
