import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  render() {
    const { image } = this.props;
    return (
      <div className={css.overlay} onClick={this.props.handleCloseModal}>
        <div className={css.modal} onClick={e => e.stopPropagation()}>
          <img src={image} alt="Cze" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string,
};
