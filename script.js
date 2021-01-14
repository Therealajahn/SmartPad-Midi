document.querySelector("button").addEventListener("click", async () => {
  window.AudioContext =
    (await window.AudioContext) || window.webkitAudioContext;
});

let context = new AudioContext();
let start = context.currentTime;
let tempo = 120;
let beatsLength = 60 / tempo;
let notes = [
  { note: "1", time: beatsLength },
  { note: "2", time: beatsLength * 2 },
  { note: "3", time: beatsLength * 3 },
  { note: "4", time: beatsLength * 4 },
  { note: "5", time: beatsLength * 5 },
  { note: "6", time: beatsLength * 6 },
];

let i = 0;
while (i < 6) {
  let osc = context.createOscillator();
  osc.connect(context.destination);
  osc.frequency.value = notes[i].note;
  osc.start(start);
  osc.stop(start + notes[i].time);

  console.log("notes:", notes[i]);
  i++;
}
