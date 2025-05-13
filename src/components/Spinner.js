import React from 'react';
import loading from './loading.gif';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="loading" className="spinner" />
    </div>
  );
};

export default Spinner;
