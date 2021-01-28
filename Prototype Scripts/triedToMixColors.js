//tried to blink colors fast enough to mix, failed
setInterval(mixColors, 500);

function mixColors() {
  console.log("mix colors");

  sequenceOne.sendRowColor(1, "white");
  sequenceOne.sendRowColor(2, "white");

  sequenceTwo.sendRowColor(3, "black");
  sequenceTwo.sendRowColor(4, "black");

  sequenceThree.sendRowColor(5, "white");
  sequenceThree.sendRowColor(6, "white");

  sequenceFour.sendRowColor(7, "black");
  sequenceFour.sendRowColor(8, "black");
  if (i % 2 === 0) {
    sequenceOne.changePadColor(1, 1, "green");
  } else {
    sequenceOne.changePadColor(1, 1, "blue");
  }
  i++;
  // requestAnimationFrame(mixColors);
}
// requestAnimationFrame(mixColors);
