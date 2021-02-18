class PadModel {
  constructor() {
    this.padModel = {
      1: [
        { background: "white", trigger: false, void: false, playhead: false },
        { background: "2", trigger: false, void: false, playhead: false },
        { background: "3", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      2: [
        { background: "9", trigger: false, void: false, playhead: false },
        { background: "10", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      3: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      4: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      5: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      6: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      7: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
      8: [
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
        { background: "", trigger: false, void: false, playhead: false },
      ],
    };
  }
  updateModel(/*{col,row,propertyToUpdate,value}*/) {
    let { col, row, propertyToUpdate, value } = arguments[0];
    this.padModel[row][col - 1][propertyToUpdate] = value;
  }

  checkModel(/*col,row*/) {
    let { col, row } = arguments[0];
    return this.padModel[row][col - 1];
  }
}
