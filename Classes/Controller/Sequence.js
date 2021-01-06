class Sequence {
  constructor(backgroundColor, restColor, playHeadColor, voidColor) {
    this.backgroundColor = backgroundColor;
    this.restColor = restColor;
    this.playHeadColor = playHeadColor;
    this.voidColor = voidColor;
    this.realPad = new RealPad();
    this.accessMIDI = new AccessMIDI();
    this.getMIDIMessages = this.accessMIDI.getMIDIMessages();
    this.incrementSequenceNumber();
  }
  //store sequence Number across instances
  static sequenceNum = 0;

  incrementSequenceNumber() {
    Sequence.sequenceNum += 1;
    console.log("yes");
  }

  sendRowColor(row, color) {
    let rowStart = this.realPad.getPadRow(row);
    console.log("rowStart", rowStart);
    let currentColor = this.realPad.getPadColor(color);
    console.log("currentColor", currentColor);

    for (let i = 0; i <= 8; i++) {
      this.accessMIDI.sendMIDI([128, i + rowStart, currentColor]);
      this.accessMIDI.sendMIDI([144, i + rowStart, currentColor]);
    }
  }
  
  changePadColor(row, col, color) {
    let padOn = this.realPad.sendPadColor(row, col, color, "on");
    let padOff = this.realPad.sendPadColor(row, col, color, "off");
    this.accessMIDI.sendMIDI(padOff);
    this.accessMIDI.sendMIDI(padOn);
  }

  advancePlayHead() {
    //return midi message for a playhead representative
    //turn off previous playhead pad using pad store
    //update realpad
    //update virtualpad
    //update padstore
  }

  addTrigger() {
    //toggle between black and white to indicate the triggering of
    //update model of pad
    //update real pad
    //upate virtual pad
  }

  createSequence() {
    //create two rows of pads that are the same color
  }
}
