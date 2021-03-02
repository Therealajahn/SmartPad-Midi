let audioContext = new AudioContext();

let osc1 = audioContext.createOscillator();
let gain1 = audioContext.createGain();
gain1.gain.value = 0.0;
osc1.connect(gain1);
gain1.connect(audioContext.destination);
osc1.frequency.value = 55;
osc1.start();
gain1.gain.setValueAtTime(0.5, 1);
gain1.gain.linearRampToValueAtTime(0.0, 2);
gain1.gain.setValueAtTime(0.5, 3);
gain1.gain.linearRampToValueAtTime(0.0, 4);

let osc2 = audioContext.createOscillator();
let gain2 = audioContext.createGain();
gain2.gain.value = 0.0;
osc2.connect(gain2);
gain2.connect(audioContext.destination);
osc2.frequency.value = 110;
osc2.start();
gain2.gain.setValueAtTime(0.5, 1.5);
gain2.gain.linearRampToValueAtTime(0.0, 2.5);
gain2.gain.setValueAtTime(0.5, 3.5);
gain2.gain.linearRampToValueAtTime(0.0, 4.5);
