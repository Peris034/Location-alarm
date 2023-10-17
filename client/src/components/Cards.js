import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Set an alarm for destination</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/location.jpg'
              text='Find destination distance'
              path='/locationinput'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
