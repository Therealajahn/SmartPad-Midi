class SmartPadConverter {
  constructor() {
    //TODO:migrate these tables to Pad Store
    this.padColors = {
      black: 0,
      white: 15,
      purple: 63,
      blue: 47,
      green: 96,
      yellow: 31,
      red: 122,
    };
    this.padRows = {
      1: 0, // to 7
      2: 16, // to 23
      3: 32, // to 39
      4: 48, // to 55
      5: 64, // to 71
      6: 80, // to 87
      7: 96, // to 103
      8: 112, // to 114
    };
    this.padCols = {
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
      7: 6,
      8: 7,
    };
  }
  getPadColor(color) {
    return this.padColors[color];
  }
  getPadRow(row) {
    return this.padRows[row];
  }
  getPadColumn(col) {
    return this.padCols[col];
  }
  getPadRowAndColumn(col, row) {
    return [this.padRows[row], this.padCols[col]];
  }
}
