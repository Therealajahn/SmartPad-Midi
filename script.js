let padModel = new PadModel();

let playhead1 = new Playhead({
  colStart: 1,
  rowStart: 1,
  tapeLength: 16,
  padModel: padModel,
});
let playhead2 = new Playhead({
  colStart: 1,
  rowStart: 3,
  tapeLength: 16,
  padModel: padModel,
});
let playhead3 = new Playhead({
  colStart: 1,
  rowStart: 5,
  tapeLength: 16,
  padModel: padModel,
});
let playhead4 = new Playhead({
  colStart: 1,
  rowStart: 7,
  tapeLength: 16,
  padModel: padModel,
});

console.log("padModel", padModel);
let sequences = new SixteenFour(
  [
    playhead1,
    playhead2,
    playhead3,
    playhead4
  ],
  padModel
);
sequences.createAlternatingRows();
sequences.drawAllPlayheads();

//setInterval(() => {
//   sequences.advanceAllPlayheads();
//}, 500);

console.log("PADMODEL", padModel);
