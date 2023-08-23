import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';
import {useEffect} from 'react'
import ReactDOM from 'react-dom';

export const Modal = ({ url, onClick, onModalClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onModalClose);
    return () => {
      window.removeEventListener('keydown', onModalClose);
    };
  }, [onModalClose]);


  return ReactDOM.createPortal(
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={url} alt="" />
      </ModalWindow>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
