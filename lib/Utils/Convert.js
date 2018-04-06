module.exports = {
  ArrayToObject: function(arr) {
    let objCur = [];
    let newObj = {};
    for (var i = 0; i < arr.length; ++i) {
      objCur.push({ label: arr[i], value: arr[i] });
      if ((arr.length - 1) === i) {
        return objCur;
      }
    }   
  },
  convertValueToLabel: function (resources_path) {
    let newArray = [];
    const resCat = resources_path;
    const arrLength = resCat.length - 1;
    if (arrLength >= 1) {
      const arr = resCat;
      // Convert value to label & id to value
      Object.keys(arr).map((key) => {
        let obj = {
          label: arr[key].value,
          value: arr[key].id
        };
        newArray.push(obj);
        if (Number(key) === arrLength) {
          return newArray;
        }
      });
    }
    return newArray;
  },
}