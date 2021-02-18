class VirtualSmartPad {
  constructor() {
    this.padDiv = document.getElementsByClassName("pad-div")[0];
    this.padBase = document.createElement("div");
    this.createPadInit();
  }
  createPadInit() {
    // create a series of elements and append them to the pad Div...
    //..giving them unique coordinate ids
    let padBase = this.padBase;

    padBase.style.width = "400px";
    padBase.style.height = "400px";
    padBase.style.borderLeft = "solid #afafaf 50px";
    padBase.style.borderRight = "solid #cfcfcf 50px";
    padBase.style.borderTop = "solid grey 50px";
    padBase.style.borderBottom = "solid grey 50px";
    padBase.setAttribute("id", "pad-base");
    this.padDiv.appendChild(padBase);
    for (let row = 1; row <= 8; ++row) {
      for (let col = 1; col <= 8; ++col) {
        let pad = document.createElement("div");
        pad.style.position = "absolute";
        pad.style.width = "20px";
        pad.style.height = "20px";
        pad.style.background = "#000";
        pad.style.marginLeft = `${col * 50}px`;
        pad.style.marginTop = `${row * 50}px`;
        pad.style.left = "-32px";
        pad.style.top = "-30px";
        padBase.appendChild(pad);
        pad.setAttribute("id", `${col},${row}`);
      }
    }
  }
  changeVirtualPadColor(col, row, color) {
    if (col && row) {
      let padToChange = document.getElementById(`${col},${row}`);
      padToChange.style.background = color;
    } else {
      throw Error("Please provide pad coordinates (col,row)");
    }
  }
}
