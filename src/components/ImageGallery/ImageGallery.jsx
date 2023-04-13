import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.gallery}>
        {this.props.images.map(image => {
          return (
            <ImageGalleryItem
              image={image}
              handleClick={this.props.handleClick}
            />
          );
        })}
      </ul>
    );
  }
}
