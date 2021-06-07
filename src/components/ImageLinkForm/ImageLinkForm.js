import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onFindPress }) => {
  return (
    <div>
      <p className='f3'>
        {`Enter in an image or image URL and we'll find their face!`}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' 
            type='text' 
            onChange={onInputChange}
          />
          <button 
            className='w-30 grow f4 link ph3 pv2 div black bg-washed-blue'
          >
            Choose File
          </button>
          <button 
            className='w-30 grow f4 link ph3 pv2 div black bg-washed-green' 
            onClick={onFindPress}
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;