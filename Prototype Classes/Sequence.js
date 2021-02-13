class Sequence {
  constructor(playHeadCol, playHeadRow) {
    this.padModel = new PadModel();
    this.smartPadConverter = new SmartPadConverter();
    this.accessMIDI = new AccessMIDI();
    this.getMIDIMessages = this.accessMIDI.getMIDIMessages();
    this.incrementSequenceNumber();
    this.playHeadCol = playHeadCol;
    this.playHeadRow = playHeadRow;
    this.playHeadRowChange = false;
    this.playHeadAtEnd = false;
  }
  //store sequence Number across instances
  static sequenceNum = 0;
  static virtualPad = new VirtualSmartPad();
  static initVirtualpad = this.virtualPad.createPadInit();
  incrementSequenceNumber() {
    Sequence.sequenceNum += 1;
  }

  sendRowColor(row, color) {
    let rowStart = this.smartPadConverter.getPadRow(row);
    let currentColor = this.smartPadConverter.getPadColor(color);

    for (let i = 0; i <= 8; i++) {
      this.accessMIDI.sendMIDI([128, i + rowStart, currentColor]);
      this.accessMIDI.sendMIDI([144, i + rowStart, currentColor]);
    }
  }

  changePadColor(row, col, color) {
    //convert color to midi
    let padColor = this.smartPadConverter.getPadColor(color);
    //convert row and column to midi
    let [padRow, padColumn] = this.smartPadConverter.getPadRowAndColumn(
      row,
      col
    );
    let padNumber = padRow + padColumn;
    //send midi to pad
    this.accessMIDI.sendMIDI([128, padNumber, padColor]);
    this.accessMIDI.sendMIDI([144, padNumber, padColor]);
    //send message to gui
    //this.virtualPad.changePadColor(row, col);
  }

  advanceAlongWidthAndLength(widthStart, widthEnd, lengthStart, lengthEnd) {
    if (widthEnd > 8) {
      throw new Error("Keep widthEnd under 8 please");
    } else if (widthStart <= 0) {
      throw new Error("Keep widthStart over 0 please");
    }

    let playHeadX = this.playHeadCol;
    let playHeadY = this.playHeadRow;

    if (this.playHeadAtEnd) {
      console.log('palyhead at end');
      this.removePastPlayhead(widthEnd, lengthEnd);
      this.playHeadAtEnd = false;
    }

    if (this.rowChanged) {
      console.log('row changed');
      this.removePastPlayhead(widthEnd, this.playHeadRow - 1);
      this.rowChanged = false;
    }
    if (playHeadX !== 1) {
      console.log("playhead not at beginning");
      this.removePastPlayhead(playHeadX - 1, this.playHeadRow);
    } else if (playHeadX === 1) {
      console.log('playhead at beginning')
      this.removePastPlayhead(widthEnd, this.playHeadRow);
    }

    // value of playHeadX is adjusted so that its in 1-8 format
    this.padModel.setOverModelPad(playHeadX, 1, "red");
    console.log("overModelRow", this.padModel.getOverModelRow(1));

    this.changePadColor(this.playHeadRow, playHeadX, "red");
    if (playHeadX === widthEnd && playHeadY === lengthEnd) {
      console.log("playhead at end");
      this.playHeadCol = widthStart;
      this.playHeadRow = lengthStart;
      this.playHeadAtEnd = true;
    } else if (playHeadX === widthEnd) {
      console.log('playhead at width end');
      this.playHeadCol = widthStart;
      this.playHeadRow += 1;
      this.rowChanged = true;
      console.log("this.playHeadRow", this.playHeadRow);
    } else {
      this.playHeadCol += 1;
    }
    return this.playHeadCol;
  }

  removePastPlayhead(pastplayHeadCol, row) {
    console.log('pastplayHeadCol, row', pastplayHeadCol, row)
    

    this.padModel.setOverModelPad(pastplayHeadCol, row, "blank");
    this.changePadColor(
      row,
      pastplayHeadCol,
      this.padModel.getUnderModelPad(pastplayHeadCol, row)
    );
  }

  createSequenceRows(start, numberOfRows, color) {
    for (let i = start; i < numberOfRows + 1; i++) {
      this.sendRowColor(i, color);
    }
  }
}
