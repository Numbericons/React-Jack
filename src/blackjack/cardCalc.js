// class CardCalc {
export default class Calc {
  constructor() {
  }

  static isPair(cards) {
    return cards[0].rank === cards[1].rank;
  }

  static hasAce(cards) {
    return cards.some(card=> card.rank === "A");
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

  static strVal(str) {
    const tens = ["T", "J", "Q", "K"];

    if (str === "A") return 11;
    if (tens.includes(str)) return 10;
    return parseInt(str);
  }

  static handResult(val1, val2){
    if (val1 === val2) return "tie";
    return val1 > val2 ? "hand1" : "hand2";
  }

  static compareHands(playerHands, board) {
    const boardVal = Calc.handTotal(board);
    let playerVals = [];

    for (let i = 0; i < playerHands.length;i++){  
      playerVals.push(Calc.handTotal(playerHands[i]));
    
    }

    for (let k = 0; k < playerVals.length;k++){
      playerVals[k] = Calc.handResult(boardVal,playerVals[k]);
    }

    return playerVals;
  }
}