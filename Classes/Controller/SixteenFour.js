class SixteenFour{
    constructor(){
        
        this.padModel = new PadModel();
        this.smartPadConverter = new SmartPadConverter();
        this.accessMIDI = new AccessMIDI();
        this.virtualPad = new VirtualSmartPad();
       
        this.playhead1 = new Playhead({rowStart:1,
                                       colStart:1,
                                       tapeLength:16,
                                       padModel: this.padModel});
        this.playhead2 = new Playhead({rowStart:3,
                                       colStart:1,
                                       tapeLength:16,
                                       padModel: this.padModel});
        this.playhead3 = new Playhead({rowStart:5,
                                       colStart:1,
                                       tapeLength:16,
                                       padModel: this.padModel});
        this.playhead4 = new Playhead({rowStart:7,
                                       colStart:1,
                                       tapeLength:16,
                                       padModel: this.padModel});                                                                                             

        this.createAlternatingRows();
        // this.advanceAllPlayheads();
        this.drawAllPlayheads();
        
        
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
    this.virtualPad.changeVirtualPadColor(col,row,color);
    }
    changeRowColor(row,color){
        for(let i = 1; i <= 8; ++i){
            this.changePadColor(i,row,color);
        }
    }
    createAlternatingRows(){
      console.log('create alternating rows START');
        this.changeRowColor(1,'white');
        this.changeRowColor(2,'white');
        this.changeRowColor(5,'white');
        this.changeRowColor(6,'white');
      console.log('create alternating rows END');
    }
    drawAllPlayheads(){
      let playheadArray = [
        this.playhead1.getPlayHeadCoordinates(),
        this.playhead2.getPlayHeadCoordinates(),
        this.playhead3.getPlayHeadCoordinates(),
        this.playhead4.getPlayHeadCoordinates(),
      ];
      for(let i = 0; i < playheadArray.length; i++){
        console.log("playheadArray",playheadArray)
        this.changePadColor(playheadArray[i][0],playheadArray[i][1], 'red');
      }     
    }
    //delete
    // advanceAllPlayheads(){
    //    this.playhead1.advancePlayhead();
    //    this.playhead2.advancePlayhead();
    //    this.playhead3.advancePlayhead();
    //    this.playhead4.advancePlayhead();

    //    console.log('pastPlayhead sixteen4',this.playhead1.getPastPlayhead(), 'white');
    //    this.changePadColor(this.playhead1.getPastPlayhead()[0],this.playhead1.getPastPlayhead()[1],
    //    'white');

    //    this.playhead2.getPastPlayhead();
    //    this.playhead3.getPastPlayhead();
    //    this.playhead4.getPastPlayhead(); 
      
    //    this.drawAllPlayheads();
       
    // }
    //new
    advanceAllPlayheads(){
      let playheadList = [
          'playhead1',
          'playhead2',
          'playhead3',
          'playhead4'
      ]
      for(let i = 0; i < 4; i++){
        this[playheadList[i]].advancePlayhead();
        let col = this[playheadList[i]].getPastPlayhead()[0];
        let row = this[playheadList[i]].getPastPlayhead()[1];
        console.log('background',this.padModel.checkModel(col,row).background);
        this.changePadColor(col,row,this.padModel.checkModel(col,row).background);
      }
      this.drawAllPlayheads();
    }
    createVoid(col,row){ 
      this.pad.updateModel(col,row,'void',true)
    }
    createTrigger(col,row){ 
      this.pad.updateModel(col,row,'trigger',true)
    }
}

