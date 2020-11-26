import React from 'react';

function cardStyle(posX, posY) {
  return {
    backgroundPositionX: posX,
    backgroundPositionY: posY
  }
}
export default function Board(props) {
  const card1 = cardStyle(props.card.img_pos_x, props.card.img_pos_y);
  return (
    <div>
      <div className='card' style={card1}></div>
    </div>
  )
}