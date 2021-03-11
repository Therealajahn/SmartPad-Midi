let audioContext = new AudioContext();
let tempo = 60;
let currentTime;
let nextEvent;

function playNotes() {
  function scheduleEvents() {
    console.log("audioContext", audioContext);
    console.log("tempo", tempo);
    console.log("currentTime", currentTime);
    console.log("nextEvent", nextEvent);
    requestAnimationFrame(scheduleEvents());
  }
  requestAnimationFrame(scheduleEvents());
}

playNotes();
