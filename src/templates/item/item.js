import { Link } from "gatsby";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import Layout from "../../components/layout/layout";
import LightBox from "../../components/light-box/light-box";
import { BUCKET_IMAGE, IMAGE_URL, TABLET_MEDIUM_BREAKPOINT } from "../../constants";
import "./item.css";

const Item = memo(({ pageContext: { locale, subsection, item, itemsForNews } }) => {
  const [viewedImage, setViewedImage] = useState();

  const getLoupeHandler = (image) => () => {
    if (window.innerWidth >= TABLET_MEDIUM_BREAKPOINT) {
      setViewedImage(image);
    }
  };

  const clearViewedImage = () => {
    setViewedImage(undefined);
  };

  return (
    <Layout
      locale={locale}
      title={item.title[locale]}
      description={item.description[locale]}
      pageName=""
      newsItems={itemsForNews}
    >
      <div className="item-content">
        <div className="item-content__title">
          <h1 className="item-content__name">{item.name[locale]}</h1>
          <div className="item-content__subsection">
            <Link to={`/${locale}/${item.subsection}/`} className="item-content__subsection-link">
              {subsection.name[locale]}
            </Link>
          </div>
        </div>
        <div className="item-content__description">{item.text[locale]}</div>
        <div className="item-content__images">
          {item.bucketOfImages.map((imageUrl) => (
            <span key={imageUrl} className="item-content__image-big">
              <img
                className="item-content__image"
                src={`${IMAGE_URL}/${BUCKET_IMAGE}/${imageUrl}`}
                alt={`${imageUrl}`}
                onClick={getLoupeHandler(`${IMAGE_URL}/${BUCKET_IMAGE}/${imageUrl}`)}
              />
            </span>
          ))}
        </div>
        <LightBox
          onRequestClose={clearViewedImage}
          isVisible={Boolean(viewedImage)}
          image={viewedImage}
        />
      </div>
    </Layout>
  );
});

Item.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default Item;
