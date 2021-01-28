class AccessMIDI {
  constructor() {
    this.requestMIDI = navigator.requestMIDIAccess();
  }

  async accessMIDIInputs() {
    return this.requestMIDI.then((access) => {
      let input;
      let midiInputs = [];
      for (input of access.inputs.values()) {
        midiInputs.push(input);
      }
      console.log('midiInputs', midiInputs)
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
      let firstOutput = outputs[1];
      firstOutput
        ? firstOutput.send(message)
        : console.log("controller not detected");
    });
  }
 
}
