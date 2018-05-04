// this.props.dropdown_categories
const parseCategories = function(val, dropdown_categories) {
  var arr = [];
  var dropdownCategories = dropdown_categories;
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