import React, { Component } from 'react';
import { FidgetSpinner } from 'react-loader-spinner';
import css from './Loader.module.css';

export class Loader extends Component {
  render() {
    return (
      <div className={css.spinner}>
        <FidgetSpinner />
      </div>
    );
  }
}
