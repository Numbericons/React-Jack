import { render } from '@testing-library/react';
import React from 'react';
import Player from './player';

// function cardStyle(posX, posY){
//   return {
//     backgroundPositionX: posX,
//     backgroundPositionY: posY
//   }
// }

// function cardArray(cards){
//   let arr = [];
//   for (let i=0; i<cards.length;i++) {
//     const card = cardStyle(cards[i].img_pos_x, cards[i].img_pos_y);
//     arr.push(<div className='card-show' key={i} style={card}></div>)
//   }
//   return arr;
// }

export default class Dealer extends Player {
  constructor(props) {
    super(props);
  }

  resolveHand(){
    
  }

  render() {
    const cards = this.cardArray(this.props.cards);
    const showTotal = this.props.revealed ? this.props.total : "";
    const busted = this.props.total > 21 ? " Busted!" : "";

    return (
      <div className='hand'>
        <div className='hand-cards'>
          {cards}
        </div>
        <div className='hand-val'>
          <div className='hand-val-txt'>{showTotal}{busted}</div>
        </div>
      </div>
    )
  }
}