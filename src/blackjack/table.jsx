import React from 'react';
import Deck from './deck';
import Player from './player';
import Dealer from './dealer';
import Board from './board';

export default class Table extends React.Component {
  constructor(props){
    super(props);
    this.newHand();
    this.state = {};

    this.hitPlayer = this.hitPlayer.bind(this);
    this.stand = this.stand.bind(this);
    this.newHand = this.newHand.bind(this);
  }

  newHand(){
    let deck = new Deck();
    const boardArr = this.dealBoard(deck);
    const playerArr = this.playerArr(deck);
    const stacks = this.playerStacks();
    
    this.setState({
      deck: deck,
      boardCards: boardArr,
      playerCards: playerArr,
      stacks: stacks,
      showTotal: false,
      resolve: false,
      currentPlayer: playerArr.length - 1
    })
  }

  playerArr(deck){
    let arr = [];
    for(let i=0; i < 1; i++) { arr.push([]) };
    for(let j=0; j < 1; j++) { arr[j].push(deck.draw(true)) };
    for(let k=0; k < 1; k++) { arr[k].push(deck.draw(true)) };
    return arr;
  }

  playerStacks(){
    let arr = [];
    for (let i = 0; i < 1; i++) { arr.push([]) };
    for (let j = 0; j < 1; j++) { arr[j].push(1000) };
    return arr;
  }

  hitPlayer(){
    if (!this.state.playerCards) return;
    
    const arr = this.state.playerCards;
    arr[this.state.currentPlayer].push(this.state.deck.draw(true));

    this.setState({ playersCards: arr});
  }

  revealHand(){
    let board = this.state.boardCards;
    board[0].revealed = true;
    this.setState({boardCards: board});
  }

  showTotal(){
    this.setState({showTotal: true});
  }

  stand(){
    this.revealHand();
    this.showTotal();
    this.setState({resolve: true});
  }
  
  dealBoard(deck){
    let arr = [];
    arr.push(deck.draw(false))
    arr.push(deck.draw(true))

    return arr;
  }

  showBoard(){
    const cards = this.state.boardCards;
    const handTotal = this.handTotal(cards);

    return (
      <Dealer cards={cards} total={handTotal} revealed={this.state.showTotal}></Dealer>
    )
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
    const stacks = this.state.stacks;
    let playerArr = this.state.playerCards.map((cards, i) => {
      const handTotal = this.handTotal(cards);
      
      return <Player key={`player${i}`} cards={cards} board={this.boardCards} total={handTotal} stack={stacks[i]}></Player>;
    });
    return playerArr;
  }

  playBtns() {
    if (this.state.resolve) {
      return (
        <div className="reset">
          <button className="btn" onClick={this.newHand}>NEW GAME</button>
        </div>
      )
    } else {
      return (
        <div className="buttons">
          <button className="btn" onClick={this.hitPlayer}>HIT</button>
          <button className="btn" onClick={this.stand}>STAND</button>
          <button className="btn" onClick={this.newHand}>NEW GAME</button>
        </div>
      )
    }
  }

  btnInterface(players) {
    if (players) return this.playBtns();
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
    const buttonInt = this.btnInterface(players);

    return (
      <div className="border">
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
          {buttonInt}
        </div>
      </div>
    )
  }
}