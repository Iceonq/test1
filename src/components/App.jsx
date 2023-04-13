import React, { Component } from 'react';
import '../styles.css';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import PropTypes from 'prop-types';

const KEY = '33284780-c89390efdc4f502db65b92b61';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    hasMore: true,
    loading: false,
    modalOpen: false,
    selectedImage: null,
  };

  handlePagination = e => {
    e.preventDefault();
    if (this.state.hasMore === true) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchImages();
      });
    }
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({
      modalOpen: true,
      selectedImage: e.target.src,
    });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  componentDidMount() {
    this.fetchImages();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.setState({
        modalOpen: false,
      });
    }
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery }, () => {
      this.fetchImages();
    });
    this.setState({ images: [] });
  };

  fetchImages = async () => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12}`
      );
      const newImages = response.data.hits;
      if (response.data.hits.length === 0) {
        alert('Nothing was found');
        this.setState({
          hasMore: false,
          loading: false,
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          loading: false,
          hasMore: true,
        }));

        this.setState({ newImages });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery
          images={this.state.images}
          modalOpen={this.state.modalOpen}
          handleClick={this.handleClick}
        />
        {this.state.loading && <Loader />}
        <Button
          pagination={this.handlePagination}
          hasMore={this.state.hasMore}
        />
        {this.state.modalOpen && (
          <Modal
            image={this.state.selectedImage}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

App.propTypes = {
  images: PropTypes.object,
  searchQuery: PropTypes.string,
  page: PropTypes.number,
  loading: PropTypes.bool,
  modalOpen: PropTypes.bool,
  selectedImage: PropTypes.object,
};
