import React from 'react';
import Deck from './deck';
import Player from './player';
import Board from './board';
import '../stylesheets/board.css';

export default class Table extends React.Component {
  constructor(props){
    super(props);
    this.newHand();
    this.state = {};
    // let deck = new Deck();
    // let boardArr = this.dealBoard(deck);
    // let playerArr = this.playerArr(deck);

    // this.state = {
    //   deck: deck,
    //   boardCards: boardArr,
    //   playerCards: playerArr,
    //   currentPlayer: playerArr.length - 1
    // }

    this.hitPlayer = this.hitPlayer.bind(this);
    this.newHand = this.newHand.bind(this);
  }

  newHand(){
    let deck = new Deck();
    const boardArr = this.dealBoard(deck);
    const playerArr = this.playerArr(deck);
    
    this.setState({
      deck: deck,
      boardCards: boardArr,
      playerCards: playerArr,
      currentPlayer: playerArr.length - 1
    })
  }

  playerArr(deck){
    let arr = [];
    for(let i=0; i < 1; i++) { arr.push([]) };
    for(let j=0; j < 1; j++) { arr[j].push(deck.draw()) };
    for(let k=0; k < 1; k++) { arr[k].push(deck.draw()) };
    return arr;
  }

  hitPlayer(){
    if (!this.state.playerCards) return;
    
    const arr = this.state.playerCards;
    arr[this.state.currentPlayer].push(this.state.deck.draw());

    this.setState({ playersCards: arr});
  }
  
  dealBoard(deck){
    let arr = [];
    arr.push(deck.draw(false))
    arr.push(deck.draw(true))

    return arr;
  }

  showBoard(){
    return this.state.boardCards.map((card, i) => (
      <Board key={`board${i}`} card={card}></Board>
    ));
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
    let playerArr = this.state.playerCards.map((cards, i) => {
      const handTotal = this.handTotal(cards);
      
      return <Player key={`player${i}`} cards={cards} board={this.boardCards} total={handTotal}></Player>;
    });
    return playerArr;
  }

  newOrButton(players) {
    if (players) return (
      <div className="buttons">
        <button className="btn-hit" onClick={this.hitPlayer}>HIT</button>
      </div>
    )
    return (
      <div className="new">
        <button className="new-btn" onClick={this.newHand}>NEW GAME</button>
      </div>
    )
  }

  render(){
    let players, board;
    if (this.state.playerCards) players = this.showPlayers();
    if (this.state.boardCards) board = this.showBoard();
    const btnInterface = this.newOrButton(players);

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
        {btnInterface}
      </div>
    )
  }
}