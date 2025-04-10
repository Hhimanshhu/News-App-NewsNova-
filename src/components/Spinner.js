import React, { Component } from 'react'
import loading from './loading.gif'
import './Spinner.css';

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" className='spinner'/> 
      </div>
    )
  }
}

export default Spinner
