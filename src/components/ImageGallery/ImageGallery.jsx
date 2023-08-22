import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          src={webformatURL}
          onClick={onClick}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
