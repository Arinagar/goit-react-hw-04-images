import { React, useState } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onInputChange = event => {
    setQuery(event.target.value);
  };

  const onSearchSubmit = event => {
    event.preventDefault();
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      alert('Please, enter your query');
      return;
    }
    onSubmit(normalizedQuery);
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSearchSubmit}>
        <button type="submit" className={css.searchForm_button}>
          <ImSearch />
        </button>

        <input
          className={css.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
