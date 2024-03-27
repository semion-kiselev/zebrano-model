import cn from "classnames";
import PropTypes from "prop-types";
import { memo, useEffect, useRef, useState } from "react";
import { usePrevious } from "../../utils";
import CloseIcon from "../icons/close";
import "./light-box.css";

const LightBox = memo(({ image, onRequestClose, isVisible }) => {
  const [overlayIsShown, setIfOverlayIsShown] = useState(false);
  const [imageIsLoaded, setIfImageIsLoaded] = useState(false);
  const [loaderIsVisible, setIfLoaderIsVisible] = useState(true);

  const overlayRef = useRef(null);

  const prevIsVisible = usePrevious(isVisible);

  useEffect(() => {
    if (typeof prevIsVisible === "undefined" || prevIsVisible === isVisible) return;

    if (isVisible) {
      overlayRef.current.style.display = "block";
      setTimeout(() => setIfOverlayIsShown(true), 20);
      return;
    }

    const transitionEnd = () => {
      overlayRef.current.style.display = "none";
      overlayRef.current.removeEventListener("transitionend", transitionEnd);
    };

    overlayRef.current.addEventListener("transitionend", transitionEnd);
    setTimeout(() => setIfOverlayIsShown(false), 20);
  }, [isVisible]);

  const handleChildrenContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleImageLoad = () => {
    setIfImageIsLoaded(true);
    setIfLoaderIsVisible(false);
  };

  const handleClose = () => {
    onRequestClose();
    setIfImageIsLoaded(false);
  };

  return (
    <div
      ref={overlayRef}
      className={cn("light-box", {
        __visible: overlayIsShown,
      })}
      onClick={handleClose}
    >
      <div className="light-box__close" onClick={onRequestClose}>
        <CloseIcon />
      </div>
      <div onClick={handleChildrenContainerClick}>
        <>
          {loaderIsVisible && <div className="light-box__loader" />}
          <div className="light-box__image-wrapper">
            <img
              className={cn("light-box__image", { "__full-size": imageIsLoaded })}
              src={image}
              alt={image}
              onLoad={handleImageLoad}
              onError={handleClose}
            />
          </div>
        </>
      </div>
    </div>
  );
});

LightBox.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  image: PropTypes.string,
};

export default LightBox;
