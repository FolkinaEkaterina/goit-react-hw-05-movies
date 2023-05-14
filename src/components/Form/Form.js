import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FormStyled } from '../App.styled';
import toast from 'react-hot-toast';

const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error(`Please enter query`);
      return;
    }
    onSubmit(query);
    setQuery('');
    e.target.reset();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <button type="submit">
        <FiSearch />
      </button>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        onChange={handleQueryChange}
      />
    </FormStyled>
  );
};

export default Form;
