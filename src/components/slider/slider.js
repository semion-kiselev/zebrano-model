import cn from "classnames";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import { memo, useRef } from "react";
import SlickSlider from "react-slick";
import { IMAGE_URL, NEWS_IMAGE, SLIDER_SETTINGS, itemStatuses } from "../../constants";
import trans from "../../lang";
import "./slider.css";

const Slider = memo(({ locale, newsItems }) => {
  const urlToNavigateRef = useRef(null);

  const handleSliderRootClick = (e) => {
    if (e.target.classList.contains("slick-arrow")) {
      return;
    }

    if (urlToNavigateRef.current) {
      navigate(urlToNavigateRef.current);
    }
  };

  const handleItemClick = (url, itemLifeCycleState) => {
    if (itemLifeCycleState === itemStatuses.COMING) {
      urlToNavigateRef.current = null;
      return;
    }

    urlToNavigateRef.current = url;
  };

  return (
    <div className="slider" onClick={handleSliderRootClick}>
      <SlickSlider {...SLIDER_SETTINGS}>
        {newsItems.map((item) => (
          <div
            key={item.slug}
            className="slider__item-wrapper"
            onClick={() =>
              handleItemClick(`/${locale}/${item.subsection}/${item.slug}`, item.lifeCycleState)
            }
          >
            <span
              className={cn("slider__item-link", {
                "slider__item-link--hovered": item.lifeCycleState !== itemStatuses.COMING,
              })}
            >
              <div className="slider__item">
                <div className="slider__item-image-wrapper">
                  <div
                    className={cn("slider__item-status", {
                      "slider__item-status--coming": item.lifeCycleState === itemStatuses.COMING,
                    })}
                  >
                    {item.lifeCycleState === itemStatuses.COMING
                      ? trans.NEW_ITEM_COMING_TITLE[locale]
                      : trans.NEW_ITEM_ON_TITLE[locale]}
                  </div>
                  <img
                    src={`${IMAGE_URL}/${NEWS_IMAGE}/${item.newsImage}`}
                    alt={item.description[locale]}
                    className="slider__item-image"
                  />
                </div>
                <div className="slider__item-name">
                  <span
                    className={cn("slider__item-name-text", {
                      "slider__item-name-text--simple": item.lifeCycleState === itemStatuses.COMING,
                    })}
                  >
                    {item.name[locale]}
                  </span>
                </div>
              </div>
            </span>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
});

Slider.propTypes = {
  locale: PropTypes.string.isRequired,
  newsItems: PropTypes.arrayOf(PropTypes.object),
};

export default Slider;
