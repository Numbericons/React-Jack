import React from 'react';

function cardStyle(posX, posY) {
  return {
    backgroundPositionX: posX,
    backgroundPositionY: posY
  }
}

function hideCard() {
  return (
    <div>
      <div className={'card-hide'}></div>
    </div>
  )
}

export default function Board(props) {
  if (!props.card.revealed) return hideCard();

  const card1 = cardStyle(props.card.img_pos_x, props.card.img_pos_y);
  
  return (
    <div>
      <div className='card-show' style={card1}></div>
      {/* <div className='hand-val-txt'>{props.total}{showBust}</div> */}
    </div>
  )
}