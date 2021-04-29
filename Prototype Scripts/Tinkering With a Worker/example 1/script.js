let worker = new Worker("worker.js");
let privilegedInfo = "HELLO MY GUY";

worker.postMessage(privilegedInfo);

worker.addEventListener("message", (e) => {
  console.log(e.data);
});
