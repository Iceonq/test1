import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    let searchQuery = e.target.searchInput.value;
    this.props.onSearch(searchQuery);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchformbutton}>
            <span className={css.searchformbuttonlabel}>Search</span>
          </button>

          <input
            className={css.searchforminput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchInput"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};
