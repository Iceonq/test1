import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  render() {
    const { image } = this.props;
    return (
      <li className={css.galleryitem}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={css.galleryitemimage}
          onClick={this.props.handleClick}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};
