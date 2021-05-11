const audioContext = new AudioContext();
const midi = new AccessMIDI();

let tempo = 60;
let eventSpace;
let nextEventTime;
let lastEventTime = 0;
let scheduleWindow = 0.1;
let beat = 0;

var steps = [
  { note: 100, time: 4, attack: 0.002, decay: 1 },
  { note: 50, time: 4, attack: 0.002, decay: 1 },
  { note: 40, time: 4, attack: 0.002, decay: 1 },
  { note: 60, time: 4, attack: 0.002, decay: 1 },

  { note: 65, time: 4, attack: 0.2, decay: 1 },
  { note: 30, time: 4, attack: 0.002, decay: 1 },
  { note: 30, time: 4, attack: 0.002, decay: 1 },
  { note: 45, time: 4, attack: 0.002, decay: 1 },

  { note: 100, time: 4, attack: 0.002, decay: 1 },
  { note: 20, time: 4, attack: 0.002, decay: 1 },
  { note: 40, time: 4, attack: 0.002, decay: 1 },
  { note: 60, time: 4, attack: 0.002, decay: 1 },

  { note: 65, time: 4, attack: 0.2, decay: 1 },
  { note: 70, time: 4, attack: 0.002, decay: 1 },
  { note: 30, time: 4, attack: 0.002, decay: 1 },
  { note: 45, time: 4, attack: 0.002, decay: 1 },
];

function makeOscillator() {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  gain.gain.value = 0.0;
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start();
  return [osc, gain];
}
let [osc1, gain1] = makeOscillator();

// use array to schedule pitch change
function attackDecay(attackTime = 0, decayTime = 0.3, time) {
  gain1.gain.linearRampToValueAtTime(0.002, time);
  gain1.gain.linearRampToValueAtTime(0.5, time + attackTime);
  gain1.gain.linearRampToValueAtTime(0.0, time + decayTime);
}

function triggerMusicalEvents() {
  // console.log("SCHEDULED!!!");
  let currentStep = steps[beat % 16];

  osc1.frequency.setValueAtTime(currentStep.note, nextEventTime);
  attackDecay(currentStep.attack, currentStep.decay, nextEventTime);
  lastEventTime += eventSpace;
  beat++;
  midi.sendMIDI([144, 50, 127], resolvedTime);
  midi.sendMIDI([128, 50, 127], resolvedTime);
}

function playNotes(interval, notes) {
  let frames = 0;
  // let interval = 60 / (milliseconds / 10);

  function scheduleEvents() {
    //use frame count to trigger shedule events
    if (frames % interval === 0) {
      eventSpace = (60 / tempo) * 0.25;
      nextEventTime = eventSpace + lastEventTime;
      if (resolvedTime > nextEventTime - scheduleWindow) {
        triggerMusicalEvents(resolvedTime);
      }
    }

    //count frames
    frames += 1;
    requestAnimationFrame(() => {
      scheduleEvents(resolvedTime);
    });
  }
  requestAnimationFrame(() => {
    scheduleEvents(resolvedTime);
  });
}

setInterval(() => {
  const pageNow = performance.now() / 1000;
  const audioNow = audioContext.currentTime;
  const secondsOffset = pageNow - audioNow;
  var resolvedTime = pageNow + secondsOffset;

  console.log(
    "pageNow",
    pageNow,
    "audioNow",
    audioNow,
    "resolvedTime",
    resolvedTime
  );
}, 500);

playNotes(60, steps);
