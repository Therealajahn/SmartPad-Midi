//convert bpm to seconds
let tempo = 60;
let tempoToSeconds = tempo / 60;
//So, how do I want to do timing?

let audioContext = new AudioContext();
let currentTime = audioContext.currentTime;

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
  { note: 400, time: 4, attack: 0, decay: 1 },
  { note: 300, time: 4, attack: 0, decay: 1 },
  { note: 100, time: 4, attack: 0.5, decay: 0.6 },
  { note: 400, time: 4, attack: 0, decay: 1 },
  { note: 200, time: 4, attack: 0.2, decay: 0.75 },
  { note: 100, time: 4, attack: 0, decay: 1 },
];
// use array to schedule pitch change
function attackDecay(attackTime = 0, decayTime = 1, time) {
  gain1.gain.setValueAtTime(0, time);
  gain1.gain.linearRampToValueAtTime(0.5, time + attackTime);
  gain1.gain.linearRampToValueAtTime(0.0, time + decayTime);
}
function playNoteList(steps) {
  console.log("playNOteRun");
  let playTime = currentTime;
  //if time is zero play note at the first second
  steps.forEach((step) => {
    console.log("currentTime", audioContext.currentTime);
    console.log("playTime", tempoToSeconds + playTime);

    osc1.frequency.setValueAtTime(step.note, step.time);
    attackDecay(0, playTime);

    playTime++;
  });
  //if time is 4 play a note every quarter note
  //schedule a note to play one quarter note after current time
}
playNoteList(steps);
