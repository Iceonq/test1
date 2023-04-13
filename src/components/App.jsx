import { useState, useEffect } from 'react';
import '../styles.css';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import PropTypes from 'prop-types';

const KEY = '33284780-c89390efdc4f502db65b92b61';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePagination = e => {
    e.preventDefault();
    if (hasMore === true) {
      setPage(page + 1);
    }
  };

  const handleClick = e => {
    e.preventDefault();
    setModalOpen(true);
    setSelectedImage(e.target.src);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchImages();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchQuery, page]);

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      setModalOpen(false);
    }
  };

  const handleSearch = query => {
    setSearchQuery(query);
    setImages([]);
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12}`
      );
      const newImages = response.data.hits;
      if (response.data.hits.length === 0) {
        alert('Nothing was found');
        setHasMore(false);
        setLoading(false);
      } else {
        setImages(prevState => [...prevState, ...newImages]);
        setLoading(false);
        setHasMore(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      <ImageGallery
        images={images}
        modalOpen={modalOpen}
        handleClick={handleClick}
      />
      {loading && <Loader />}
      <Button pagination={handlePagination} hasMore={hasMore} />
      {modalOpen && (
        <Modal image={selectedImage} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

App.propTypes = {
  images: PropTypes.object,
  searchQuery: PropTypes.string,
  page: PropTypes.number,
  loading: PropTypes.bool,
  modalOpen: PropTypes.bool,
  selectedImage: PropTypes.object,
};

export default App;
