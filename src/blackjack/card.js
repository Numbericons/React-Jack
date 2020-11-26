export default class Card {
  constructor(rank, suit, img_pos_x, img_pos_y, revealed) {
    this.suit = suit;
    this.rank = rank;
    this.img_pos_x = img_pos_x;
    this.img_pos_y = img_pos_y;
    this.revealed = revealed;
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

  // display(element, width, height, player) {
  //   element.style.backgroundImage = 'url("https://js-holdem.s3-us-west-1.amazonaws.com/deck400.png")';
  //   element.style.backgroundPosition = `${this.img_pos_x}px ${this.img_pos_y}px`;
  //   element.style.width = width;
  //   element.style.height = height;
  //   this.radius(element, player);
  //   element.style.marginLeft = "5px";
  //   element.style.backgroundSize = "";
  //   element.style.display = "";
  // }

  // hide(element, width, height, player) {
  //   element.style.backgroundImage = 'url("https://js-holdem.s3-us-west-1.amazonaws.com/cardback_red_acorn2.jpg")';
  //   element.style.backgroundPosition = ' -2px -4px';
  //   element.style.width = width;
  //   element.style.height = height;
  //   this.radius(element, player);
  //   element.style.marginLeft = "5px";
  //   element.style.backgroundSize = "75px 112px";
  //   element.style.display = "";
  // }
}