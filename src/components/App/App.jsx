import { Component } from 'react';
import { fetchImages } from 'constants/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Wrapper } from './App.styled';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    items: [],
    page: 1,
    totalPages: null,
    perPage: 12,
    selectedImageUrl: null,
    isModalOpen: false,
    isLoading: false,
  };
  startLoader = () => {
    this.setState({ isLoading: true });
  };
  stopLoader = () => {
    this.setState({ isLoading: false });
  };
  onSubmit = e => {
    e.preventDefault();
    const {
      search: { value: searchQuery },
    } = e.target.elements;
    if (searchQuery.trim() === '') {
      return;
    }
    if (searchQuery.trim() !== this.state.searchQuery) {
      this.setState({
        searchQuery,
        items: [],
        page: 1,
      });
    }
  };
  onLoadMore = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  };
  onImageClick = e => {
    const { id } = e.currentTarget;
    const { items } = this.state;
    const largeImageURL = [...items]
      .filter(item => item.id === Number(id))
      .map(obj => obj.largeImageURL)
      .join('');
    const selectedImageUrl = largeImageURL;
    this.setState({ selectedImageUrl });
    this.showModal();
  };
  onModalClose = e => {
    if (e.key === 'Escape') {
      this.hideModal();
    }
  };

  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  hideModal = () => {
    this.setState({ isModalOpen: false });
  };

  onBackdropClick = e => {
    const { hideModal } = this;
    if (e.target.nodeName !== 'IMG') {
      hideModal();
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const { startLoader, stopLoader } = this;
    const { page, perPage, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        startLoader();
        const response = await fetchImages(searchQuery, page, perPage);
        const {
          data: { hits: items, totalHits },
        } = response;
        const totalPages = Math.ceil(totalHits / perPage);

        this.setState(state => {
          return { items: [...state.items, ...items], totalPages };
        });
      } catch (error) {
        console.log(error);
      } finally {
        stopLoader();
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalClose);
  }
  render() {
    const {
      items,
      selectedImageUrl,
      page,
      totalPages,
      isModalOpen,
      isLoading,
    } = this.state;

    const {
      onLoadMore,
      onSubmit,
      onImageClick,
      onBackdropClick,
      onModalClose,
    } = this;
    return (
      <Wrapper>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery images={items} onClick={onImageClick}></ImageGallery>
        {items.length > 1 && page > 0 && page < totalPages && !isLoading && (
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
  }
}
