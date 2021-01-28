class VirtualSmartPad {
    constructor(){
        this.padDiv = document.getElementsByClassName('pad-div')[0];
        this.padBase = document.createElement('div');
    }
    createPadInit(){
        // create a series of elements and append them to the pad Div...
        //..giving them unique coordinate ids
        let padBase = this.padBase;
        padBase.style.width = "400px";
        padBase.style.height = "400px";
        padBase.style.background = "#fff";
        padBase.style.borderLeft = "solid #afafaf 50px";
        padBase.style.borderRight = "solid #cfcfcf 50px";
        padBase.style.borderTop = "solid grey 50px"; 
        padBase.style.borderBottom = "solid grey 50px";
        this.padDiv.appendChild(padBase);
        for(let i = 1; i <= 8; ++i){
            for(let j = 1; j <= 8; ++j){
                let pad = document.createElement('div');
                pad.style.position = "absolute";
                pad.style.width = "20px";
                pad.style.height = "20px";
                pad.style.background = "#000";
                pad.style.marginLeft = `${j*50}px`; 
                pad.style.marginTop = `${i*50}px`;
                pad.style.left = "22px";
                pad.style.top = "50px";
                padBase.appendChild(pad);
                pad.setAttribute('id',`${i},${j}`)
            }
        }
    }
    changePadColor(col,row){
        let padToChange = document.getElementById(`${col},${row}`);
        padToChange.style.background = 'red';
    }
} 