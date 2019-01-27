import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {graphql, navigate} from 'gatsby';
import SlickSlider from 'react-slick';
import {SLIDER_SETTINGS, IMAGE_URL, NEWS_IMAGE, itemStatuses} from '../constants';
import trans from '../lang';

class Slider extends PureComponent {
    constructor(props) {
        super(props);

        this.urlToNavigate = null;

        this.handleSliderRootClick = this.handleSliderRootClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleSliderRootClick(e) {
        if (e.target.classList.contains('slick-arrow')) {
            return;
        }
        navigate(this.urlToNavigate);
    }

    handleItemClick(url) {
        return () => this.urlToNavigate = url;
    }

    render() {
        const {locale, newsItems} = this.props;

        return (
            <div
                className="slider"
                onClick={this.handleSliderRootClick}
            >
                <SlickSlider {...SLIDER_SETTINGS}>
                    {newsItems.map(item => (
                        <div
                            key={item.slug}
                            className="slider__item-wrapper"
                            onClick={this.handleItemClick(`/${locale}/${item.subsection}/${item.slug}`)}
                        >
                            <span className="slider__item-link">
                                <div className="slider__item">
                                    <div className="slider__item-image-wrapper">
                                        <div className={cn('slider__item-status', {
                                            'slider__item-status--coming': item.lifeCycleState === itemStatuses.COMING
                                        })}>
                                            {
                                                item.lifeCycleState === itemStatuses.COMING
                                                    ? trans.NEW_ITEM_COMING_TITLE[locale]
                                                    : trans.NEW_ITEM_ON_TITLE[locale]
                                            }
                                        </div>
                                        <img
                                            src={`${IMAGE_URL}/${NEWS_IMAGE}/${item.newsImage}`}
                                            alt={item.description[locale]}
                                            className="slider__item-image"
                                        />
                                    </div>
                                    <div className="slider__item-name">
                                    <span className={cn('slider__item-name-text', {
                                        'slider__item-name-text--simple': item.lifeCycleState === itemStatuses.COMING
                                    })}>
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
    }
}

Slider.propTypes = {
    locale: PropTypes.string.isRequired,
    newsItems: PropTypes.arrayOf(PropTypes.object)
};

export default Slider;

export const query = graphql`
    fragment NewItemsFragment on ItemsJson {
        slug,
        name {
            ru,
            en
        },
        description {
            ru,
            en
        },
        subsection,
        lifeCycleState,
        newsImage
    }
`;
