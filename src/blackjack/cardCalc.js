// class CardCalc {
export default class Calc {
  constructor() {
  }

  static handTotal(cards) {
    let total = 0;
    let aces = 0;

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].rank === "A") aces += 1;
      total += Calc.cardVal(cards[i])
    }
    if (aces > 0 && total <= 11) total += 10;

    return total;
  }

  static cardVal(card) {
    if (parseInt(card.rank)) return parseInt(card.rank);

    const tens = ["T", "J", "Q", "K"];
    if (tens.includes(card.rank)) return 10;
    if (card.rank === "A") return 1;
  }

  static hello() {console.log('hello world')};
}