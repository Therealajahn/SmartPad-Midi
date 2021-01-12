let sequenceOne = new Sequence();
let sequenceTwo = new Sequence();
let sequenceThree = new Sequence();
let sequenceFour = new Sequence();
let col = 0;
let playhead = 0;

// setInterval(() => {
//   col = col % 8;
//   playhead = col + 1;
//   sequenceOne.changePadColor(playhead, 1, "red");
//   sequenceTwo.changePadColor(playhead, 3, "red");
//   sequenceThree.changePadColor(playhead, 5, "red");
//   sequenceFour.changePadColor(playhead, 7, "red");
//   col++;
// }, 500);

sequenceOne.sendRowColor(1, "white");
sequenceOne.sendRowColor(2, "white");

sequenceTwo.sendRowColor(3, "black");
sequenceTwo.sendRowColor(4, "black");

sequenceThree.sendRowColor(5, "white");
sequenceThree.sendRowColor(6, "white");

sequenceFour.sendRowColor(7, "black");
sequenceFour.sendRowColor(8, "black");

