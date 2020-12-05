import React from 'react';
import Deck from './deck';
import Player from './player';
import Dealer from './dealer';
import Basic from './basic';
import Calc from './cardCalc';

export default class Table extends React.Component {
  constructor(props){
    super(props);
    this.state = {aiMode: true};
    this.bet = 500;

    this.hitPlayer = this.hitPlayer.bind(this);
    this.double = this.double.bind(this);
    this.stand = this.stand.bind(this);
    this.aiHand = this.aiHand.bind(this);
    this.newHand = this.newHand.bind(this);
  }

  takeBets(stacks){
    for (let i=0; i<stacks.length; i++) {
      stacks[i][0] = stacks[i][0] - this.bet;
      stacks[i].push(this.bet);
    }
    this.setState({playerStacks: stacks});
  }

  newHand(){
    let deck = new Deck();
    const boardArr = this.dealBoard(deck);
    const playerArr = this.playerArr(deck);
    let stacks = this.state.playerStacks || this.playerStacks();
    stacks = this.takeBets(stacks);

    this.setState({
      deck: deck,
      boardCards: boardArr,
      playerCards: playerArr,
      stacks: stacks,
      showTotal: false,
      bet: 500,
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
    for (let j = 0; j < 1; j++) { arr[j].push(10000) };
    return arr;
  }

  hitPlayer(){
    if (!this.state.playerCards) return;
    
    const arr = this.state.playerCards;
    arr[this.state.currentPlayer].push(this.state.deck.draw(true));

    this.setState({ playersCards: arr});
  }

  double(){
    let stack = this.state.playerStacks[this.state.currentPlayer];
    stack[0] -= this.bet;
    stack[stack.length - 1] += this.bet;

    this.hitPlayer();
    this.resolveDealer();
  }

  revealHand(){
    let board = this.state.boardCards;
    board[0].revealed = true;
    this.setState({boardCards: board});
  }

  showTotal(){
    this.setState({showTotal: true});
  }

  payBets() {
    const resultsArr = Calc.compareHands(this.state.playerCards, this.state.boardCards);
    let stacks = this.state.playerStacks;

    for (let i = resultsArr.length; i > 0; i--){
      const result = resultsArr.pop();
      const bet = stacks[0].pop();
      if (result === "hand1") continue;
      stacks[0][0] += result === "hand2" ? bet * 2 : bet;
    }

    this.setState({playerStacks: stacks});
  }

  resolveDealer(){
    this.revealHand();
    this.showTotal();
    this.resolveHand();
    this.payBets();
    this.setState({ resolve: true });
  }
  
  stand(){
    this.resolveDealer();
  }
  
  dealBoard(deck){
    let arr = [];
    arr.push(deck.draw(false))
    arr.push(deck.draw(true))

    return arr;
  }

  hasAce(cards) {
    return cards.some(card => card.rank === "A");
  }

  aiHand() {
    let cards = this.state.playerCards[0];
    let basic = new Basic(cards, true);
    let upcard = this.state.boardCards[1].rank;
    let action = basic.resolveHand(upcard);

    if (action === "double") {
      cards.push(this.state.deck.draw(true));
    } else if (action === "split") {
    } else {
      if (action !== "hold") basic.firstAct = false;
      while (action !== "stand" && action !== "busted") {
        cards.push(this.state.deck.draw(true));
        basic.cards = cards;
        action = basic.resolveHand(upcard);
      }
    }

    this.setState({playersCards: cards});
    this.resolveDealer();
  }

  resolveHand() {
    let cards = this.state.boardCards;
    let total = Calc.handTotal(cards)
    let ace = this.hasAce(cards);


    while (total < 17 || (total === 17 && ace)) {
      const card = this.state.deck.draw(true);
      cards.push(card);
      total = Calc.handTotal(cards);
      if (card.rank === "A") ace = true;
    }

    this.setState({boardCards: cards});
  }

  showBoard() {
    const cards = this.state.boardCards;
    const handTotal = Calc.handTotal(cards);
    return <Dealer cards={cards} total={handTotal} revealed={this.state.showTotal}></Dealer>;
  }

  showPlayers(){
    const stacks = this.state.playerStacks;
    let playerArr = this.state.playerCards.map((cards, i) => {
      const handTotal = Calc.handTotal(cards);
      
      return <Player key={`player${i}`} cards={cards} board={this.boardCards} total={handTotal} stack={stacks[i]}></Player>;
    });
    return playerArr;
  }

  playBtns(players) {
    if (this.state.resolve || players[this.state.currentPlayer].props.total > 20) {
      return (
        <div className="reset">
          <button className="btn" onClick={this.newHand}>NEW GAME</button>
        </div>
      )
    } else {
      return (
        <div className="buttons">
          <button className="btn" onClick={this.hitPlayer}>HIT</button>
          <button className="btn" onClick={this.double}>DOUBLE</button>
          <button className="btn" onClick={this.stand}>STAND</button>
          <button className="btn" onClick={this.aiHand}>BASIC</button>
          <button className="btn" onClick={this.newHand}>NEW GAME</button>
        </div>
      )
    }
  }

  btnInterface(players) {
    if (players) return this.playBtns(players);
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