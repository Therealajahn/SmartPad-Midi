let startStop = { status: "start" };

function listenForStartStop(countFrames) {
  self.addEventListener("message", (e) => {
    let [trigger, tempo, beatValue] = e.data;

    console.log("listenforstartstop called");
    console.log("tempo", tempo);
    if (trigger === "start") {
      //start timer
      startStop.status = "start";
    } else if (trigger === "stop") {
      //stop timer
      startStop.status = "stop";
    }

    if (beatValue === "quarter") {
      beatDivision = 0.25;
    } else if (beatValue === "whole") {
      beatDivision = 1;
    } else if (beatValue === "half") {
      beatDivision = 0.25;
    }

    requestAnimationFrame((timestamp) => {
      countFrames(timestamp, tempo, beatDivision);
    });
  });
}

startFrameCount();

function startFrameCount() {
  let frames = 0;

  function countFrames(timestamp, tempo, beatDivision) {
    //convert tempo(beats per minute) to beats per second
    //use frame count to trigger shedule events
    let interval = (60 / (tempo / 60)) * beatDivision;

    postMessage("tick");

    if (frames % interval === 0) {
      postMessage("tick gui");
    }
    //count frames
    frames += 1;
    if (startStop.status !== "stop") {
      requestAnimationFrame((timestamp) => {
        countFrames(timestamp, tempo, beatDivision);
      });
    }
  }
  listenForStartStop(countFrames);
}
