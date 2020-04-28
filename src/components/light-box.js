import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CloseIcon from './icons/close';

class LightBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            overlayIsShown: false,
            imageIsLoaded: false,
            loaderIsVisible: true
        };

        this.overlay = createRef();

        this.handleChildrenContainerClick = this.handleChildrenContainerClick.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {isVisible} = this.props;

        if (prevProps.isVisible !== isVisible) {
            if (isVisible) {
                this.overlay.current.style.display = 'block';
                setTimeout(() => this.setState({overlayIsShown: true}), 20);
                return;
            }

            const transtionEnd = () => {
                this.overlay.current.style.display = 'none';
                this.overlay.current.removeEventListener('transitionend', transtionEnd);
            };

            this.overlay.current.addEventListener('transitionend', transtionEnd);
            setTimeout(() => this.setState({overlayIsShown: false}), 20);
        }
    }

    handleChildrenContainerClick(e) {
        e.stopPropagation();
    }

    handleImageLoad() {
        this.setState({
            imageIsLoaded: true,
            loaderIsVisible: false
        });
    }

    handleClose() {
        this.props.onRequestClose();
        this.setState({imageIsLoaded: false});
    }

    render() {
        const {image, onRequestClose} = this.props;
        const {overlayIsShown, imageIsLoaded, loaderIsVisible} = this.state;

        return (
            <div
                ref={this.overlay}
                className={cn('light-box', {
                    '__visible': overlayIsShown
                })}
                onClick={this.handleClose}
            >
                <div className="light-box__close" onClick={onRequestClose}>
                    <CloseIcon />
                </div>
                <div onClick={this.handleChildrenContainerClick}>
                    <>
                        {loaderIsVisible && <div className="light-box__loader" />}
                        <div className="light-box__image-wrapper">
                            <img
                                className={cn('light-box__image', {'__full-size': imageIsLoaded})}
                                src={image}
                                alt={image}
                                onLoad={this.handleImageLoad}
                                onError={this.handleClose}
                            />
                        </div>
                    </>
                </div>
            </div>
        );
    }
}

LightBox.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    image: PropTypes.string
};

export default LightBox;
