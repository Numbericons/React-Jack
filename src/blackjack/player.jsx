import React from 'react';

export default class Player extends React.Component {
  cardStyle(posX, posY) {
    return {
      backgroundPositionX: posX,
      backgroundPositionY: posY
    }
  }

  cardArray(cards) {
    let arr = [];
    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].revealed) {
        arr.push(<div className={'card-hide'} key={i}></div>)
        continue;
      }
      const card = this.cardStyle(cards[i].img_pos_x, cards[i].img_pos_y);
      arr.push(<div className='card-show' key={i} style={card}></div>)
    }
    return arr;
  }

  render(){
    const cards = this.cardArray(this.props.cards);
    const showBust = this.props.total > 21 ? " Busted!" : "";

    return (
      <div className='hand'>
        <div className='hand-cards'>
          {cards}
        </div>
        <div className='hand-val'>
          <div className='hand-val-txt'>{this.props.total}{showBust}</div>
          <div className='hand-val-txt'>Stack: ${this.props.stack}</div>
        </div>
      </div>
    )
  }
}