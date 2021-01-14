class PadModel extends SmartPadConverter {
  constructor() {
    super();
    // prettier-ignore
    this.underModel = {
      1: ["white","white","white","white","white","white","white","white"],
      2: ["white","white","white","white","white","white","white","white"],
      row4: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
      row5: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
      row6: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
      row7: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
      row8: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
    };
     this.overModel = {
      1: ["blank","blank","blank","blank","blank","blank","blank","blank"],
      2: ["blank","blank","blank","blank","blank","blank","blank","blank"],
      3: ["blank","blank","blank","blank","blank","blank","blank","blank"],
      row4: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
      row5: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
      row6: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
      row7: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
      row8: { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "", col7: "", col8: ""},
    };
  }
   getUnderModelPad(col,row){
    //value of col is adjusted so that its in 1-8 format
    return this.underModel[row][col - 1];
  }
  getOverModelPad(col,row){
    //value of col is adjusted so that its in 1-8 format
    return this.overModel[row][col - 1];
  }
  getOverModelRow(row){
    return this.overModel[row];
  }
  setOverModelPad(col,row,color){
    //value of col is adjusted so that its in 1-8 format
    this.overModel[row][col - 1] = color;
  }
}
