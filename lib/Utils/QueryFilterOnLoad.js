import { filterState } from '@folio/stripes-components/lib/FilterGroups/FilterGroups';
import PropTypes from 'prop-types';
import _ from 'lodash';

const QueryFilterOnLoad = (props, updateStateFilter) => {
  const runDefaultQuery = props.mutator.localRes.update({ query: 'query=(name=*)' });
  if (props.location.search !== null) {
    var onCheckString = _.includes(props.location.search, '?filters=');
    if (onCheckString) {
      var url = decodeURIComponent(props.location.search);
      // var nurl = url.replace('?filters=', '');
      var urlTrimStart = _.trimStart(url, '?filters=');
      var nurl = _.trimEnd(urlTrimStart, '&sortby=');
      console.log(nurl);
      var onCheckURL = _.includes(nurl, 'vendor_status.');


      // var str = "?filters=vendor_status.Pending,vendor_status.Active&sortby=name";
      // var atSignIndex =str.indexOf("&");
      // var newStr = str.substring(0, 51);
      // console.log(newStr);


      if (nurl.length >= 1) {
        var arr = nurl.split(',');
        // Check if array contains something
        if (!_.isEmpty(arr)) {
          loopArray(arr, props ,updateStateFilter);
        }
      } else {
        runDefaultQuery // vendor_status found in the url
      }
    } else {
      runDefaultQuery // No filters found
    }
  } else {
    runDefaultQuery // no location found
  }
}


const loopArray = (arr, props, updateStateFilter) => {
  if (arr.length === 1) {
    // Update filter state
    var urlFilters = filterState(arr[0]);
    updateStateFilter(urlFilters);
    // Update mutator
    var indexOfStr = arr[0].indexOf(".") + 1;
    var str = arr[0].substring(indexOfStr, arr[0].length);
    return props.mutator.localRes.update({ query: 'query=(name=*) and vendor_status=(' + str + ')' });
  } else if (arr.length > 1) {
    var filterStr = '';

    for (var i in arr) {
      var indexOfStr = arr[i].indexOf(".") + 1;
      var str = arr[i].substring(indexOfStr, arr[i].length);
      if ((Number(i)) === 0) {
        filterStr = str;
      } else {
        filterStr = filterStr + ' or ' + str;
      }
      if ((Number(i) + 1) == arr.length) {
        console.log(arr);
        // var urlFilters = filterState(arr);
        // updateStateFilter(urlFilters);
        return props.mutator.localRes.update({ query: 'query=(name=*) and vendor_status=(' + filterStr + ')' });
      }
    }
  }
}

QueryFilterOnLoad.PropTypes = {
  mutator: PropTypes.object,
  updateStateFilter: PropTypes.func
}

export { QueryFilterOnLoad };