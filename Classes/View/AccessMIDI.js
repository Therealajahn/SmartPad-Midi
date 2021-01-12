class AccessMIDI {
  constructor() {
    this.requestMIDI = navigator.requestMIDIAccess();
    this.padColors = {
      black: 0,
      white: 15,
      purple: 63,
      blue: 47,
      green: 96,
      yellow: 31,
      red: 122,
    };
    this.padRow = {
      1: 0, // to 7
      2: 16, // to 23
      3: 32, // to 39
      4: 48, // to 55
      5: 64, // to 71
      6: 80, // to 87
      7: 96, // to 103
      8: 112, // to 114
    };
  }
  //merge with real pad, delete accessMIDI
  async accessMIDIInputs() {
    return this.requestMIDI.then((access) => {
      let input;
      let midiInputs = [];
      for (input of access.inputs.values()) {
        midiInputs.push(input);
      }
      return midiInputs;
    });
  }
  getMIDIMessages() {
    this.accessMIDIInputs().then((inputs) => {
      //print mesages from first input
      inputs[0].onmidimessage = (message) => {
        console.log("midiMessage:", message.data);
      };
    });
  }
  async accessMIDIOutputs() {
    return this.requestMIDI.then((access) => {
      let output;
      let midiOutputs = [];
      for (output of access.outputs.values()) {
        midiOutputs.push(output);
      }
      return midiOutputs;
    });
  }
  sendMIDI(message) {
    this.accessMIDIOutputs().then((outputs) => {
      let firstOutput = outputs[0];
      firstOutput
        ? firstOutput.send(message)
        : console.log("controller not detected");
    });
  }
  sendPadColor(row, col, color, messageType) {
    let currentCol = this.padRow[col];
    let currentPad = row - 1 + currentCol;
    let currentColor = this.padColors[color];
    let onOrOff = "";
    if (messageType === "on") {
      onOrOff = 144;
    } else if (messageType === "off") {
      onOrOff = 128;
    }
    this.sendMIDI([onOrOff, currentPad, currentColor]);
  }
}
