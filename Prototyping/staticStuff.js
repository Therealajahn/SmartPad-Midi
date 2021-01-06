class Sequence {
  constructor(backgroundColor, playHeadColor) {
    this.backgroundColor = backgroundColor;
    this.playHeadColor = playHeadColor;
    this.realPad = new RealPad();
    this.accessMIDI = new AccessMIDI();
  }
  static num = 0;
  static getNum() {
    return Sequence.num;
  }
  static addToNum() {
    return Sequence.num++;
  }
  getNum() {
    return Sequence.num;
  }
  addToNum() {
    Sequence.num++;
  }
}

console.log("Sequence.num", Sequence.num);
console.log("Sequence.addToNum", Sequence.addToNum());
console.log("Sequence.getNUm", Sequence.getNum());

let sequence = new Sequence();
console.log('sequence', sequence)

console.log("sequence.addToNUm", sequence.addToNum());
console.log("sequence.getNUm", sequence.getNum());
console.log("sequence.addToNUm", sequence.addToNum());
console.log("sequence.getNUm", sequence.getNum());


