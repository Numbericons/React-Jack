import React from 'react';
import Deck from './deck';
import Player from './player';
import Board from './board';
import './board.css';

export default class Table extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      deck: new Deck()
    }
    this.dealCards();
    this.newHand = this.newHand.bind(this);
    this.currentPlayer = this.playerCards.length - 1;
  }

  newDeck(){
    this.setState({ deck: new Deck() });
  }

  playerArr(){
    let arr = [];
    for(let i=0; i < 3; i++) { arr.push([]) };
    for(let j=0; j < 3; j++) { arr[j].push(this.state.deck.draw()) };
    for(let k=0; k < 3; k++) { arr[k].push(this.state.deck.draw()) };
    this.playerCards = arr;
  }

  hitPlayer(){
    this.playersCards[this.currentPlayer].push(this.state.deck.draw());
  } 

  dealCards(){
    this.playerArr();
    this.dealBoard();
  }
  
  dealBoard(){
    let arr = [];
    arr.push(this.state.deck.draw(false))
    arr.push(this.state.deck.draw(true))

    this.boardCards = arr;
  }

  showBoard(){
    return this.boardCards.map((card, i) => (
      <Board key={`board${i}`} card={card}></Board>
    ));
  }
  
  newHand(){
    this.newDeck();
    this.dealCards();
    this.showBoard();
    this.showPlayers();
    this.setState({reset: true});
  }

  cardVal(card) {
    if (parseInt(card.rank)) return parseInt(card.rank);

    const tens = ["T", "J", "Q", "K"];
    if (tens.includes(card.rank)) return 10;
    if (card.rank === "A") return 1;
  }

  handTotal(cards) {
    let total = 0;
    let aces = 0;

    for (let i=0; i<cards.length; i++) {
      if (cards[i].rank === "A") aces += 1;
      total += this.cardVal(cards[i])
    }
    if (aces > 0 && total <= 11) total += 10; 

    return total;
  }

  showPlayers(){
    let playerArr = this.playerCards.map((cards, i) => {
      const handTotal = this.handTotal(cards);
      
      return <Player key={`player${i}`} cards={cards} board={this.boardCards} total={handTotal}></Player>;
    });
    return playerArr;
  }

  refreshPage(){
    this.setState({deck: true});
  }

  render(){
    let players = this.showPlayers();
    let board = this.showBoard();
    return (
      <div className="table">
        <div className="table-head">
          <h1 className="table-head-title">React Jack</h1>
          <div className='board'>
            {board}
          </div>
        </div>
        <div className="players">
          {players}
        </div>
        <div className="new">
          <button className="btn-hit" onClick={this.hitPlayer}>Hit</button>
          <button className="new-btn" onClick={this.newHand}>NEW HAND</button>
        </div>
      </div>
    )
  }
}