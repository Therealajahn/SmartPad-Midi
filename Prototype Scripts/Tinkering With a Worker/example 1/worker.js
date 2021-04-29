self.addEventListener("message", (e) => {
  postMessage(`HE SAID: ${e.data}`);
});
