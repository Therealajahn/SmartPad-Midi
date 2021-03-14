var audioContext = new AudioContext();

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

playNotes(100, steps);

function playNotes(milliseconds, notes) {
  let tempo = 240;
  let eventSpace;
  let nextEventTime;
  let lastEventTime = 0;
  let scheduleWindow = 0.1;
  let frames = 0;
  let interval = 60 / (milliseconds / 10);

  let beat = 0;

  function scheduleEvents() {
    let currentStep = steps[beat % 16];
    //use frame count to trigger shedule events
    if (frames % interval === 0) {
      console.log("frames", frames);
      //Convert tempo to seconds to get the space between beats(sixteenth notes for now)
      eventSpace = 60 / tempo;
      nextEventTime = eventSpace + lastEventTime;

      // console.log("eventSpace", eventSpace);
      // console.log("nextEventTime", nextEventTime);
      // console.log("audioContext.currentTime", audioContext.currentTime);

      //if the difference betweeen the next event and the current time is less than the length
      // of the schedule window apart, schedule the next event
      if (audioContext.currentTime > nextEventTime - scheduleWindow) {
        // console.log("SCHEDULED!!!");

        osc1.frequency.setValueAtTime(currentStep.note, nextEventTime);
        attackDecay(currentStep.attack, currentStep.decay, nextEventTime);
        lastEventTime += eventSpace;
        sequences.advanceAllPlayheads();
        beat++;
      }
    }

    //count frames
    frames += 1;
    requestAnimationFrame(scheduleEvents);
  }
  requestAnimationFrame(scheduleEvents);
}
