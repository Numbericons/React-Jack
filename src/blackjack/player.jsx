import React from 'react';

function cardStyle(posX, posY){
  return {
    backgroundPositionX: posX,
    backgroundPositionY: posY
  }
}

export default function Player(props) {
  const card1 = cardStyle(props.cards[0].img_pos_x, props.cards[0].img_pos_y);
  const card2 = cardStyle(props.cards[1].img_pos_x, props.cards[1].img_pos_y);
  return (
    <div className='hand'>
      <div className='hand-cards'>
        <div className='card-show' style={card1}></div>
        <div className='card-show' style={card2}></div>
      </div>
      <div className='hand-val'>
        <div className='hand-val-txt'>{props.total}</div>
        {/* <div className='hand-val-txt'>Flopped: {handRank[0].descr}</div>
        <div className='hand-val-txt'>Overall: {handRank[1].descr}</div> */}
      </div>
    </div>
  )
}