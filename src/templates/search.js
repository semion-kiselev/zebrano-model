import PropTypes from "prop-types";
import { memo, useEffect, useMemo, useState } from "react";
import Layout from "../components/layout";
import LightBox from "../components/light-box";
import SearchCard from "../components/search-card";
import { SEARCH_INPUT_MAX_LENGTH, pageLinks } from "../constants";
import trans from "../lang";
import { applySearchQuery, getItemsBySearchQuery } from "../utils";

const Search = memo(({ pageContext: { locales, locale, subsections, itemsForNews } }) => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [hasError, setHasError] = useState(false);
  const [items, setItems] = useState([]);
  const [viewedImage, setViewedImage] = useState();

  const subsectionsMap = useMemo(
    () =>
      subsections.reduce((acc, subsection) => {
        acc[subsection.slug] = subsection;
        return acc;
      }, {}),
    [subsections]
  );

  useEffect(() => {
    getItemsBySearchQuery({ query, locales })
      .then((items) => setItems(items))
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        setHasError(true);
        setItems([]);
      });
  }, [query]);

  const handleLoupe = (image) => {
    setViewedImage(image);
  };

  const clearViewedImage = () => {
    setViewedImage(undefined);
  };

  const handleQueryChange = ({ target: { value } }) => {
    setInputValue(value);
    setHasError(false);
    applySearchQuery(value, setQuery);
  };

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
            value={inputValue}
            onChange={handleQueryChange}
          />
        </div>
        {hasError && <div className="search-content__no-results">{trans.SEARCH_ERROR[locale]}</div>}
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
