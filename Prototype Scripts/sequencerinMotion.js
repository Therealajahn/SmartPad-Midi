let midi = new AccessMIDI();
midi.getMIDIMessages();
let sequenceOne = new Sequence(1, 1);
let sequenceTwo = new Sequence();
let sequenceThree = new Sequence();
let sequenceFour = new Sequence();

sequenceOne.createSequenceRows(1, 2, "white");
setInterval(() => {
  sequenceOne.advanceAlongWidthAndLength(1, 8, 1, 2);
}, 500);
