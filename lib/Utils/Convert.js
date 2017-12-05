module.exports = {
  ArrayToObject: function(stateName, arr) {
    let objCur = [];
    let newObj = {};
    for (var i = 0; i < arr.length; ++i) {
      objCur.push({ label: arr[i], value: arr[i] });
      if ((arr.length - 1) === i) {
        newObj[stateName] = objCur;
        return newObj;
      }
    }   
  }
}