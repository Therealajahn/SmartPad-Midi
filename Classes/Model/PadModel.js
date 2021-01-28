class PadModel{
  constructor() {
   
    this.padModel = {
      1: [{background:"",trigger:false, void:false, playhead:false,}, {background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},],
      2: [{background:"",trigger:false, void:false, playhead:false,}, {background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},],
      3: [{background:"",trigger:false, void:false, playhead:false,}, {background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},],
      4: [{background:"",trigger:false, void:false, playhead:false,}, {background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},],
      5: [{background:"",trigger:false, void:false, playhead:false,}, {background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},],
      6: [{background:"",trigger:false, void:false, playhead:false,}, {background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},],
      7: [{background:"",trigger:false, void:false, playhead:false,}, {background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},],
      8: [{background:"",trigger:false, void:false, playhead:false,}, {background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},{background:"",trigger:false, void:false, playhead:false,},],
    };
  }
  updateModel(col,row,propertyToUpdate,value){
      this.padModel[col][row - 1][propertyToUpdate] = value; 
  }

  checkModel(col,row){
    return this.padModel[col][row - 1];
  }

}

