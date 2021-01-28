navigator.requestMIDIAccess().then((access) => {
  accessMIDI(access);
});

function accessMIDI(access) {
  console.log("access", access);
  let midiInputs = [];
  for (input of access.inputs.values()) {
    midiInputs.push(input);
    console.log("midiInputs", midiInputs);
  }
  let midiOutputs = [];
  for (output of access.outputs.values()) {
    midiOutputs.push(output);
    console.log("midiOutputs", midiOutputs);
  }
  let smartPadOutput = midiInputs[0];

  smartPadOutput.onmidimessage = (message) => {
    console.log("message", message.data);
  };

  let smartPadInput = midiOutputs[0];
  smartPadInput.send([144, 51, 127]);
}


