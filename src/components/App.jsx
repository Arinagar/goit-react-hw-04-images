import { React, useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages, normalizeImages } from 'service/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button.styled';
import { RingLoader } from 'react-spinners';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!searchQuery) return;
      setLoading(true);
      setError('');
      try {
        const data = await getImages(searchQuery, page);
        if (data.hits.length === 0) {
          alert('Sorry, nothing found');
          return;
        }
        const normalizedImages = normalizeImages(data.hits);
        setImages(prev => [...prev, ...normalizedImages]);
        setTotalImages(data.totalHits);
      } catch (error) {
        setError(`Something went wrong... ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [searchQuery, page]);

  const onIncrementPage = () => {
    setPage(prev => prev + 1);
  };

  const onImageSearch = newQuery => {
    if (newQuery === searchQuery) {
      alert('same query! Try to change your request');
      return;
    }

    setSearchQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalImages(0);
  };
  const isLastResults = images.length === totalImages;
  const showLoadMore = !isLastResults && !loading;
  return (
    <div className="App">
      <Searchbar onSubmit={onImageSearch} />
      {images.length > 0 && <ImageGallery data={images} />}
      <div className="loader">
        {loading && <RingLoader color="#36d7b7" size={100} />}
      </div>
      {showLoadMore && (
        <Button type="button" onClick={onIncrementPage}>
          Load more
        </Button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
