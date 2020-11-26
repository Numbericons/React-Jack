export default class Card {
  constructor(rank, suit, img_pos_x, img_pos_y, revealed) {
    this.suit = suit;
    this.rank = rank;
    this.img_pos_x = img_pos_x;
    this.img_pos_y = img_pos_y;
  }

  showSuit(){
    switch (this.suit) {
      case "s":
        return "\u2660"
      case "h":
        return "\u2661"
      case "d":
        return "\u2662"
      case "c":
        return "\u2663"
      default:
        return 0;
    }
  }
  show() {
    return `${this.rank}${this.showSuit()}`
  }
}