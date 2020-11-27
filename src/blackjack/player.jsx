import React from 'react';

function cardStyle(posX, posY){
  return {
    backgroundPositionX: posX,
    backgroundPositionY: posY
  }
}

function cardArray(cards){
  let arr = [];
  for (let i=0; i<cards.length;i++) {
    const card = cardStyle(cards[i].img_pos_x, cards[i].img_pos_y);
    arr.push(<div className='card-show' style={card}>

    </div>)
  }
  return arr;
}

export default function Player(props) {
  // const card1 = cardStyle(props.cards[0].img_pos_x, props.cards[0].img_pos_y);
  // const card2 = cardStyle(props.cards[1].img_pos_x, props.cards[1].img_pos_y);
  const cards = cardArray(props.cards);
  const showBust = props.total > 21 ? " Busted!" : "";
  return (
    <div className='hand'>
      <div className='hand-cards'>
        {cards}
        {/* <div className='card-show' style={card1}></div>
        <div className='card-show' style={card2}></div> */}
      </div>
      <div className='hand-val'>
        <div className='hand-val-txt'>{props.total}{showBust}</div>
      </div>
    </div>
  )
}