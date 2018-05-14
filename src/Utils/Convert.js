module.exports = {
  ArrayToObject: (arr) => {
    const objCur = [];
    for (let i = 0; i < arr.length; ++i) {
      objCur.push({ label: arr[i], value: arr[i] });
      return objCur;
    }
    return objCur;
  },
  convertValueToLabel: (resourcesPath) => {
    const newArray = [];
    const resCat = resourcesPath;
    const arrLength = resCat.length - 1;
    if (arrLength >= 1) {
      const arr = resCat;
      // Convert value to label & id to value
      Object.keys(arr).map((key) => {
        const obj = {
          label: arr[key].value,
          value: arr[key].id
        };
        newArray.push(obj);
        return newArray;
      });
    }
    return newArray;
  }
};
