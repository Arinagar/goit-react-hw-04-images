import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css.imageGalleryItem} key={image.id}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={css.imageGalleryItem_image}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal
          url={image.largeImageURL}
          alt={image.tags}
          onModalClick={toggleModal}
        />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
