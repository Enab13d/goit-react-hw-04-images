import { GalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, src, onClick }) => {
  return (
    <GalleryItem onClick={onClick} id={id}>
      <img src={src} alt="" />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
