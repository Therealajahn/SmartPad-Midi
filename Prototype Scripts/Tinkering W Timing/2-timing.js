let tempo = 60;
let sixteenth = 60000 / tempo;

let audioContext = new AudioContext();

// create oscillators
function makeOscillator() {
  let osc = audioContext.createOscillator();
  let gain = audioContext.createGain();
  gain.gain.value = 0.0;
  osc.connect(gain);
  gain.connect(audioContext.destination);
  return [osc, gain];
}
let [osc1, gain1] = makeOscillator();
// make array of steps to play
let steps = [
  { note: 400, time: 1 },
  { note: 300, time: 2 },
  { note: 100, time: 3 },
  { note: 400, time: 4 },
  { note: 200, time: 5 },
  { note: 100, time: 6 },
];
// use array to schedule pitch change
function playNote() {
  osc1.start();
  steps.forEach((step) => {
    //change pitch to that of the current note
    console.log("stepnote", step.note);
    console.log("steptime", step.time);
    osc1.frequency.setValueAtTime(step.note, step.time);
    //make an attack decay envelope
    let attackTime = 0.5;
    let decayTime = 1;
    gain1.gain.setValueAtTime(0, step.time);
    gain1.gain.linearRampToValueAtTime(0.5, step.time + attackTime);
    gain1.gain.linearRampToValueAtTime(0.0, step.time + decayTime);
  });
}
playNote();
// setInterval(() => {
//   console.log("context", audioContext);
// }, 1000);
