import React, { Component } from 'react';
import css from './Button.module.css';

export class Button extends Component {
  render() {
    let buttonVisibility = {};
    if (this.props.hasMore === true) {
      buttonVisibility.opacity = 1;
    } else {
      buttonVisibility.opacity = 0;
    }
    return (
      <button
        onClick={this.props.pagination}
        className={css.button}
        style={buttonVisibility}
      >
        Load More
      </button>
    );
  }
}
