class RealPad {
  constructor() {
    //TODO:migrate these tables to Pad Store
    this.padColors = {
      black:0,
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
  //TODO: merge this logic with AccessMIDI
  getPadRow(row) {
    return this.padRow[row];
  }

  getPadColor(color) {
    return this.padColors[color];
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
    return [onOrOff, currentPad, currentColor];
  }
}
