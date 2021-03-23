class Playhead {
  constructor(/*{rowStart,colStart,tapeLength,padModel}*/) {
    //merge the object passed in with Playhead "this"
    //to access properties with "this" preface
    Object.assign(this, arguments[0]);
    this.playheadPath = [];
    this.playheadPosition = 0;
    this.playheadCoordinates = this.getPlayheadCoordinates();
    this.createPlayheadPath();
  }

  //create a playhead id that will be incremented every time a playhead is created

  createPlayheadPath() {
    //create 2d array of pad coordinates
    for (let i = 0; i < this.tapeLength / 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.playheadPath.push([j + this.colStart, i + this.rowStart]);
      }
    }
  }
  getPlayHeadPath() {
    return this.playheadPath;
  }
  advancePlayhead() {
    this.padModel.updateModel({
      col: this.playheadCoordinates[0],
      row: this.playheadCoordinates[1],
      propertyToUpdate: "playhead",
      value: true,
    });
    this.playheadPosition++;
    this.playheadPosition = this.playheadPosition % this.tapeLength;
  }
  getPastPlayhead() {
    //when playhead is incremented, return past playhead coordinates
    let path = this.playheadPath;

    let position = this.playheadPosition;

    let pastPlayhead =
      position === 0 ? path[path.length - 1] : path[position - 1];

    this.padModel.updateModel({
      col: pastPlayhead[0],
      row: pastPlayhead[1],
      propertyToUpdate: "playhead",
      value: false,
    });
    let background = this.padModel.checkModel({
      col: pastPlayhead[0],
      row: pastPlayhead[1],
    }).background;
    return [pastPlayhead, background];
  }
  getPlayheadCoordinates() {
    if (!this.playheadPosition) {
      return [this.colStart, this.rowStart];
    }

    return this.playheadPath[this.playheadPosition];
  }
}
