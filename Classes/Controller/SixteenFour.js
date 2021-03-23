class SixteenFour {
  constructor(/*[playheadArray],padModel*/) {
    this.smartPadConverter = new SmartPadConverter();
    this.accessMIDI = new AccessMIDI();
    this.virtualPad = new VirtualSmartPad();
    this.playheadArray = arguments[0];
    this.padModel = arguments[1];
  }

  changePadColor(col, row, color) {
    //convert color to midi
    let padColor = this.smartPadConverter.getPadColor(color);
    //convert row and column to midi
    let [padRow, padColumn] = this.smartPadConverter.getPadRowAndColumn(
      col,
      row
    );
    let padNumber = padRow + padColumn;
    //send midi to pad
    this.accessMIDI.sendMIDI([128, padNumber, padColor]);
    this.accessMIDI.sendMIDI([144, padNumber, padColor]);
    //send message to gui
    this.virtualPad.changeVirtualPadColor(col, row, color);
  }
  changeRowColor(row, color) {
    for (let i = 1; i <= 8; ++i) {
      this.changePadColor(i, row, color);
    }
  }
  changeRowModel(row, color) {
    for (let i = 1; i <= 8; ++i) {
      this.padModel.updateModel({
        col: i,
        row: row,
        propertyToUpdate: "background",
        value: color,
      });
    }
  }
  createAlternatingRows() {
    this.changeRowColor(1, "white");
    this.changeRowColor(2, "white");
    this.changeRowColor(3, "black");
    this.changeRowColor(4, "black");
    this.changeRowColor(5, "white");
    this.changeRowColor(6, "white");
    this.changeRowColor(7, "black");
    this.changeRowColor(8, "black");

    this.changeRowModel(1, "white");
    this.changeRowModel(2, "white");
    this.changeRowModel(3, "black");
    this.changeRowModel(4, "black");
    this.changeRowModel(5, "white");
    this.changeRowModel(6, "white");
    this.changeRowModel(7, "black");
    this.changeRowModel(8, "black");
  }
  drawAllPlayheads() {
    for (let i = 0; i < this.playheadArray.length; i++) {
      this.changePadColor(
        this.playheadArray[i].getPlayheadCoordinates()[0],
        this.playheadArray[i].getPlayheadCoordinates()[1],
        "red"
      );
      let [pastPlayhead, background] = this.playheadArray[i].getPastPlayhead();
      this.changePadColor(pastPlayhead[0], pastPlayhead[1], background);
    }
  }

  advanceAllPlayheads() {
    console.log("ADVANCE PLAY");
    for (let i = 0; i < this.playheadArray.length; i++) {
      this.playheadArray[i].advancePlayhead();
    }
    this.drawAllPlayheads();
  }
  createVoid(col, row) {
    this.pad.updateModel(col, row, "void", true);
  }
  createTrigger(col, row) {
    this.pad.updateModel(col, row, "trigger", true);
  }
}
