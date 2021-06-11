import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  let filledBox = box.length > 0;
  if (filledBox) {
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
          <img 
            id='inputimage'
            alt='Face Recognition' 
            src={imageUrl}
            width='700px'
            height='auto'
          />
          {box.map((boundingBox, i) => 
            <div 
              key={i}
              className='bounding-box'
              style={{
                top: box[i].topRow, 
                right: box[i].rightCol, 
                bottom: box[i].bottomRow, 
                left: box[i].leftCol
              }}
            />
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
          <img 
            id='inputimage'
            alt='Face Recognition' 
            src={imageUrl}
            width='700px'
            height='auto'
          />
        </div>
      </div>
    );
  }
}

export default FaceRecognition;