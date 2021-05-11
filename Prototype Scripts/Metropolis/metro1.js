let button = document.getElementsByClassName("button")[0];
let worker = new Worker("/Classes/Controller/Repeater/repeaterWorker.js");

let noteCount = 0;
let beatCount = 0;
let tempo = 60;

let workerStopped = true;
button.addEventListener("click", () => {
  if (workerStopped) {
    worker.postMessage("start");
    worker.addEventListener("message", (e) => {
      if (e.data === "tick") {
        metro(tempo);
      }
    });
    workerStopped = false;
  } else {
    worker.postMessage("stop");
    workerStopped = true;
  }
});

let noteDisplay = document.getElementsByClassName("note-display")[0];

function counter(cycle) {
  noteCount++;

  if (cycle) {
    let countCycle = noteCount % cycle;
    noteDisplay.innerHTML = countCycle;
    return countCycle;
  } else {
    console.log("noteCount:", noteCount);
    return noteCount;
  }
}

let tempoSlider = document.getElementsByClassName("tempo-slider")[0];

let tempoDisplay = document.getElementsByClassName("tempo-display")[0];

tempoSlider.addEventListener("input", () => {
  tempoDisplay.innerHTML = tempoSlider.value;
  tempo = tempoSlider.value;
});

function metro(tempo) {
  let interval = 60 / (tempo / 60);
  beatCount++;
  if (beatCount % interval === 0) {
    counter(8);
  }
}
