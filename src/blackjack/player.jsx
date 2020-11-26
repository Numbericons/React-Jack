import React from 'react';

function cardStyle(posX, posY){
  return {
    backgroundPositionX: posX,
    backgroundPositionY: posY
  }
}

// function handVal(card1, card2, board) {
//   let floppedHand = [`${card1.rank}${card1.suit}`, `${card2.rank}${card2.suit}`];
//   let fullHand = [`${card1.rank}${card1.suit}`, `${card2.rank}${card2.suit}`];
//   for (let i = 0, len = board.length; i < len; i++) {
//     let card = (`${board[i].rank}${board[i].suit}`);
//     fullHand.push(card);
//     if (i < 3) floppedHand.push(card);
//   }
//   return [Hand.solve(floppedHand), Hand.solve(fullHand)];
// }

export default function Player(props) {
  const card1 = cardStyle(props.cards[0].img_pos_x, props.cards[0].img_pos_y);
  const card2 = cardStyle(props.cards[1].img_pos_x, props.cards[1].img_pos_y);
  // const handRank = handVal(props.cards[0], props.cards[1], props.board);
  return (
    <div className='hand'>
      <div className='hand-cards'>
        <div className='card' style={card1}></div>
        <div className='card' style={card2}></div>
      </div>
      <div className='hand-val'>
        <div className='hand-val-txt'>Flopped: </div>
        <div className='hand-val-txt'>Overall: </div>
        {/* <div className='hand-val-txt'>Flopped: {handRank[0].descr}</div>
        <div className='hand-val-txt'>Overall: {handRank[1].descr}</div> */}
      </div>
    </div>
  )
}