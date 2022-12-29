import { React, Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages, normalizeImages } from 'service/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button.styled';
import { RingLoader } from 'react-spinners';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    error: null,
    loading: false,
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchPhotos();
    }
  }

  onIncrementPage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  fetchPhotos = async () => {
    this.setState({ loading: true });
    try {
      const data = await getImages(this.state.searchQuery, this.state.page);
      if (data.hits.length === 0) {
        alert('Sorry, nothing found');
        return;
      }
      const normalizedImages = normalizeImages(data.hits);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...normalizedImages],
          totalImages: data.totalHits,
          error: '',
        };
      });
    } catch (error) {
      this.setState({ error: `Something went wrong... ${error.message}` });
    } finally {
      this.setState({ loading: false });
    }
  };

  onImageSearch = newQuery => {
    if (newQuery === this.state.searchQuery) {
      alert('same query! Try to change your request');
      return;
    }

    this.setState({
      searchQuery: newQuery,
      images: [],
      page: 1,
      totalImages: 0,
    });
  };

  render() {
    const { loading, totalImages, images, error } = this.state;
    const isLastResults = images.length === totalImages;
    const showLoadMore = !isLastResults && !loading;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onImageSearch} />
        {images.length > 0 && <ImageGallery data={this.state.images} />}
        <div className="loader">
          {loading && <RingLoader color="#36d7b7" size={100} />}
        </div>
        {showLoadMore && (
          <Button type="button" onClick={this.onIncrementPage}>
            Load more
          </Button>
        )}
        {error && <p>{error}</p>}
      </div>
    );
  }
}
