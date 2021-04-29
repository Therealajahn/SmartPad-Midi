let startStop = { status: "start" };

function listenForStartStop(countFrames) {
  self.addEventListener("message", (e) => {
    if (e.data === "start") {
      //start timer
      startStop.status = "start";
    } else if (e.data === "stop") {
      //stop timer
      startStop.status = "stop";
    }

    requestAnimationFrame(countFrames);
  });
}

startFrameCount();

function startFrameCount() {
  let frames = 0;

  function countFrames() {
    postMessage("tick");

    if (startStop.status !== "stop") {
      requestAnimationFrame(countFrames);
    }
  }
  listenForStartStop(countFrames);
}
