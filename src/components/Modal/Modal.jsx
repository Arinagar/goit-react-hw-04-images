import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRootRef = document.getElementById('modal-root');

export const Modal = ({ onModalClick, url, alt }) => {
  useEffect(() => {
    const closeModal = event => {
      if (event.code === 'Escape') {
        onModalClick();
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, [onModalClick]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onModalClick();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRootRef
  );
};

Modal.propTypes = {
  onModalClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
