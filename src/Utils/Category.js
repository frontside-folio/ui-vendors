const parseCategories = function(val, dropdownCategories) {
  var arr = [];
  var dropdownCategories = dropdownCategories;
  val.forEach(function (val1, key1) {
    dropdownCategories.forEach(function (val2, key2) {
      if (val1 === val2.value) {
        return arr.push(val2.label);
      }
    });
  });
  return arr.join(', ');
}

export { parseCategories };