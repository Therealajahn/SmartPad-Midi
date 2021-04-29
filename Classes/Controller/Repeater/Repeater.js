class Repeater {
  //NOTE: Repeater is doing things it shouldn't like producing oscillators
  //and envelopes, they will be removed laters
  constructor(task, audioContext) {
    this.audioContext = audioContext;
    this.task = task;

    this.tempo = 60;
    this.beatValue = "quarter";
    this.eventSpace;
    this.nextEventTime;
    this.lastEventTime = 0;
    this.scheduleWindow = 0.1;
    this.beat = 0;

    this.steps = [
      { note: 100, time: 4, attack: 0.002, decay: 1 },
      { note: 100, time: 4, attack: 0.002, decay: 1 },
      { note: 100, time: 4, attack: 0.002, decay: 1 },
      { note: 100, time: 4, attack: 0.002, decay: 1 },

      { note: 100, time: 4, attack: 0.2, decay: 1 },
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

    this.playNotes(3);
    [this.osc1, this.gain1] = this.makeOscillator();
  }

  makeOscillator() {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.0;
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start();
    return [osc, gain];
  }

  attackDecay(target, attackTime, decayTime, time) {
    target.gain.linearRampToValueAtTime(0.002, time);
    target.gain.linearRampToValueAtTime(0.5, time + attackTime);
    target.gain.linearRampToValueAtTime(0.0, time + decayTime);
  }

  triggerMusicalEvents() {
    console.log("GAIN ONE", this.gain1);
    let currentStep = this.steps[this.beat % 16];
    this.osc1.frequency.setValueAtTime(currentStep.note, this.nextEventTime);
    this.attackDecay(
      this.gain1,
      currentStep.attack,
      currentStep.decay,
      this.nextEventTime
    );

    this.lastEventTime += this.eventSpace;

    console.log("BETA", this.beat);
    this.beat++;
  }
  scheduleEvents() {
    //use frame count to trigger shedule events

    console.log("EVENTS QS");
    this.eventSpace = (60 / this.tempo) * 0.25;
    this.nextEventTime = this.eventSpace + this.lastEventTime;
    if (
      this.audioContext.currentTime >
      this.nextEventTime - this.scheduleWindow
    ) {
      this.triggerMusicalEvents();
    }
  }
  playNotes(interval) {
    let worker = new Worker("Classes/Controller/Repeater/repeaterWorker.js");
    worker.postMessage(["start", this.tempo, this.beatValue]);
    worker.addEventListener("message", (e) => {
      console.log("TIMER OUTPUT", e.data);
      if (e.data === "tick gui") {
        this.task();
      }
      if (e.data === "tick") {
        this.scheduleEvents();
      }
    });
  }
}
