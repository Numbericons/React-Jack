
// class Basic {
export default class Basic {
  constructor(cards) {
    this.cards = cards;
  }

  static hello() {console.log('hello world')};

  nextAction(){
    const total = Basic.handTotal(this.cards);
  }
}