import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.target.elements.search.value.trim();
    if (keyword) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <FormControl
        type='text'
        name='search'
        placeholder='Search products...'
        className='mr-sm-2 ml-sm-5'
      ></FormControl>
      <button type='submit' className='btn btn-outline-light p-2'>
        Search
      </button>
    </Form>
  );
};

export default SearchBox; 