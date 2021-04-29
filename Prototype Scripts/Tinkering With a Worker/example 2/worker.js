self.addEventListener("message", (e) => {
  postMessage(`HE SAID: ${e.data}`);
  startCountingFrames();
});

function startCountingFrames() {
  let frames = 0;
  function countFrames() {
    if (frames % 60 === 0) {
      postMessage(frames);
    }
    frames++;
    requestAnimationFrame(countFrames);
  }
  requestAnimationFrame(countFrames);
}
