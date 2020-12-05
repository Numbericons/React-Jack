import Player from './player';

export default class Dealer extends Player {
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