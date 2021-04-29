let count = 0;
let button = document.getElementsByClassName("button")[0];
button.addEventListener("onclick", () => {
  counter(count, 3);
});

function counter(count, cycle) {
  count++;
  let countCycle = count % cycle;
  if (cycle) {
    console.log("countCycle:", countCycle);
    return countCycle;
  } else {
    console.log("count:", count);
    return count;
  }
}
