import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };
  render() {
    const { image } = this.props;
    return (
      <li className={css.imageGalleryItem} key={image.id}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={css.imageGalleryItem_image}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal
            url={image.largeImageURL}
            alt={image.tags}
            onModalClick={this.toggleModal}
          />
        )}
      </li>
    );
  }
}
