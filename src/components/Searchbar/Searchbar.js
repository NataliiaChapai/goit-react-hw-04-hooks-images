import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({onSubmit}) {

  const [title, setTitle] = useState('');

  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setTitle(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (title.trim() === '') {
      return;
    }
    onSubmit(title);
  };

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            name="name"
            value={title}
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }
