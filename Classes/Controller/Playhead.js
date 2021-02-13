class Playhead{
    constructor(/*{rowStart,colStart,tapeLength,padModel}*/){
       
       //merge the object passed in with Playhead "this"
       //to access properties with "this" preface 
        Object.assign(this,arguments[0])
        this.playheadPath = [];
        this.playheadPosition = 0;
        this.playheadCoordinates = this.playheadPath[this.playheadPosition]; 
        // this.playheadCoordinates = [];
        this.createPlayheadPath();
        
    }
    
    //create a playhead id that will be incremented every time a playhead is created
   

    createPlayheadPath(){
       //create 2d array of pad coordinates
       for(let i = 0; i < 2; i++){
           for(let j = 0; j < 8; j++){
               this.playheadPath.push([ (j + this.colStart),( i + this.rowStart ) ])
           }
       }
    }
    getPlayHeadPath(){
        return this.playheadPath;
    }
    advancePlayhead(){
        //increment through playhead path, changing current pad to playhead color
        // this.playheadCoordinates = this.playheadPath[this.playheadPosition]; 
        this.padModel.updateModel({col:this.playheadCoordinates[0],
                                   row:this.playheadCoordinates[1],
                                   propertyToUpdate:'background',
                                   value:'red',
                                });
        this.playheadPosition++;
        this.playheadPosition = this.playheadPosition % this.tapeLength;
    }
    getPastPlayhead(){
        //when playhead is incremented, return past playhead coordinates
        let path = this.getPlayHeadPath();
        let position = this.playheadPosition
        
        let pastPlayhead =
            position === 1?
                path[path.length - position]
                : path[position - 2];
        return pastPlayhead;
    }
    getPlayHeadCoordinates(){
        if(!this.playheadPath[0]){
            return [this.rowStart, this.colStart];
        }
        return this.playheadCoordinates;
    }
}

