import { React, Component } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onInputChange = event => {
    this.setState({
      query: event.target.value,
    });
  };

  onSearchSubmit = event => {
    event.preventDefault();
    const normalizedQuery = this.state.query.trim().toLowerCase();
    if (!normalizedQuery) {
      alert('Please, enter your query');
      return;
    }
    this.props.onSubmit(normalizedQuery);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSearchSubmit}>
          <button type="submit" className={css.searchForm_button}>
            <ImSearch />
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
