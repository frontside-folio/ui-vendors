import PropTypes from 'prop-types';
import _ from 'lodash';

const onChangeFilterUpdateQuery = (filters, props) => {
  console.log('onChangeFilterUpdateQuery');
  var arr = [];
  var filterStr = "";
  var filterLength = _.size(filters);
  var searchTerm = props.searchTerm || '*';
  if (filterLength >= 1) {
    Object.keys(filters).forEach(function (key, i) {
      if (filters[key] === true) {
        var dotIndex = key.indexOf(".");
        var strLength = key.length;
        var str = key.substring(dotIndex+1, strLength);
        arr.push(str);
        if(filterLength-1 === i) {
          var arrSize = _.size(arr);
          if (arrSize === 1) {
            var item = arr[0];
            return props.mutator.localRes.update({ query: 'query=(name=' + searchTerm + ') and vendor_status=(' + item + ')', filter: '*' });
          } else if (arrSize > 1) {
            var items = arr.join(' or ');
            return props.mutator.localRes.update({ query: 'query=(name=' + searchTerm + ') and vendor_status=(' + items + ')', filter: items });
          }
        }
      }
    })
  }
}

onChangeFilterUpdateQuery.PropTypes = {
  mutator: PropTypes.object
}

export default onChangeFilterUpdateQuery;