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
  }

  newDeck(){
    this.setState({ deck: new Deck() });
  }

  playerArr(){
    let arr = [];
    for(let i=0; i < 1; i++) { arr.push([]) };
    for(let j=0; j < 1; j++) { arr[j].push(this.state.deck.draw()) };
    for(let k=0; k < 1; k++) { arr[k].push(this.state.deck.draw()) };
    this.playerCards = arr;
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

  showPlayers(){
    return this.playerCards.map((cards, i) => (
      <Player key={`player${i}`} cards={cards} board={this.boardCards}></Player>
    ));
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
          <button className="new-btn" onClick={this.newHand}>NEW HAND</button>
        </div>
      </div>
    )
  }
}