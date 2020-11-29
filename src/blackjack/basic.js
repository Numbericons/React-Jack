import Calc from './cardCalc';
// class Basic {
export default class Basic {
  constructor(cards, firstAct) {
    this.cards = cards;
    this.firstAct = firstAct;
  }

  //upcard is the value of the dealers card
  resolveHand(upcard){
    const total = Calc.handTotal(this.cards);
    const ace = Calc.hasAce(this.cards);
    const pair = Calc.isPair(this.cards);
    const upVal = Calc.strVal(card);

    return this.nextAction(total,ace,pair, upVal);
  }

  overEleven() {
    if (total === 12) {
      if (upVal > 3 && upVal < 7) return "stand";
      return "hit"
    }

    if (upVal < 7) return "stand";
    return "hit";
  }

  overEight() {
    if (total === 9) {
      if (upVal > 2 && upVal < 7) return "double";
      return "hit"
    }

    if (upVal < 10) return "double";
    return "hit";
  }

  doubleOrAct(min, max, defAct){
    if (upVal >= min && upVal < max) {
      if (this.firstAct) return "double";
      return defAct;
    }
    return "hit";
  }

  splitOrHold(max, upVal) {
    if (upVal <= max) return "split";
    return "hold"
  }

  actionPair(total, upcard, upVal){
    if (this.cards[0].rank === "A") return "split";
    if (total === 20) return "hold";
    if (total === 18) {
      if (upVal === 7 || upVal > 9) return "hold";
      return "split";
    }
    if (total === 16) return "split";
    if (total === 14) return this.splitOrHold(7, upVal);
    if (total === 12) return this.splitOrHold(6, upVal);
    if (total === 10) return "hold";
    if (total === 8) {
      if (upVal === 5 || upVal === 6) return "split";
      return "hold";
    }
    if (total === 6 || total === 4) return this.splitOrHold(7, upVal);
  }

  actionAce(upcard, upVal){
    if (total === 20) return "stand";
    if (total === 19) return this.doubleOrAct(6, 7, "stand")
    if (total === 18) return this.doubleOrAct(2, 7, "stand");
    if (total === 17) return this.doubleOrAct(3, 7, "hit");
    if (total === 16 || total === 15) return this.doubleOrAct(4, 7, "hit");
    if (total === 14 || total === 13) return this.doubleOrAct(5, 7, "hit");
  }

  actionElse(upVal){
    if (total > 16) return "stand";
    if (total > 12) return this.overEleven(upVal)
    if (total === 11 && this.firstAct) return "double";
    if (total > 8) return this.overEight();
    if (total <= 8) return "hit";
  }

  nextAction(total, ace, pair){
    if (pair) return this.actionPair(total);
    if (ace) return this.actionAce(total);

    return this.actionElse(total);
  }
}