import { useState, useEffect } from 'react';
import { fetchImages } from 'constants/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Wrapper } from './App.styled';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [perPage] = useState(12);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startLoader = () => {
    setIsLoading(true);
  };
  const stopLoader = () => {
    setIsLoading(false);
  };
  const onSubmit = e => {
    e.preventDefault();
    const {
      search: { value },
    } = e.target.elements;

    if (value.trim() === '') {
      return;
    }
    if (value.trim() !== searchQuery) {
      setSearchQuery(value);
      setItems([]);
      setPage(1);
    }
    setSearchQuery(value);
  };
  const onLoadMore = () => setPage(page => page + 1);

  const onImageClick = e => {
    const { id } = e.currentTarget;
    const largeImageURL = [...items]
      .filter(item => item.id === Number(id))
      .map(obj => obj.largeImageURL)
      .join('');
    setSelectedImageUrl(largeImageURL);
    showModal();
  };
  const onModalClose = e => {
    if (e.key === 'Escape') {
      hideModal();
    }
  };

  const showModal = () => setIsModalOpen(true);

  const hideModal = () => setIsModalOpen(false);

  const onBackdropClick = e => {
    if (e.target.nodeName !== 'IMG') {
      hideModal();
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function fetchData() {
      try {
        startLoader();
        const response = await fetchImages(searchQuery, page, perPage);
        const {
          data: { hits: items, totalHits },
        } = response;
        const totalPages = Math.ceil(totalHits / perPage);
        setItems(prevItems => [...prevItems, ...items]);
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoader();
      }
    }
    fetchData();
  }, [searchQuery, page, perPage]);

  return (
    <Wrapper>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={items} onClick={onImageClick}></ImageGallery>
      {items.length > 1 && page < totalPages && !isLoading && (
        <Button onClick={onLoadMore} />
      )}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal
          url={selectedImageUrl}
          onClick={onBackdropClick}
          onModalClose={onModalClose}
        />
      )}
    </Wrapper>
  );
};
