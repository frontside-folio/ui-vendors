import { filterState } from '@folio/stripes-components/lib/FilterGroups/FilterGroups';
import PropTypes from 'prop-types';
import _ from 'lodash';

const SetFiltersOnLoad = (props, updateStateFilter) => {
  const runDefaultQuery = props.mutator.localRes.update({ query: 'query=(name=*) and vendor_status=(*)', filter: '*' });
  if (props.location.search !== null) {
    var onCheckString = _.includes(props.location.search, '?filters=');
    if (onCheckString) {
      var url = decodeURIComponent(props.location.search);
      var urlTrimStart = _.trimStart(url, '?filters=');
      var atSignIndex = urlTrimStart.indexOf("&");
      var nurl = atSignIndex !== Number(-1) ? urlTrimStart.substring(0, atSignIndex) : urlTrimStart;
      if (nurl.length >= 1) {
        var arr = nurl.split(',');
        // Check if array contains something
        if (!_.isEmpty(arr)) {
          loopArray(arr, nurl, props, updateStateFilter);
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


const loopArray = (arr, nurl ,props, updateStateFilter) => {
  if (arr.length === 1) {
    // Update filter state
    var urlFilters = filterState(arr[0]);
    updateStateFilter(urlFilters);
    // Update mutator
    var indexOfStr = arr[0].indexOf(".") + 1;
    var str = arr[0].substring(indexOfStr, arr[0].length);
    return props.mutator.localRes.update({ query: 'query=(name=*) and vendor_status=(' + str + ')', filter: '*' });
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
        var urlFilters = filterState(nurl);
        updateStateFilter(urlFilters);
          return props.mutator.localRes.update({ query: 'query=(name=*) and vendor_status=(' + filterStr + ')', filter: filterStr });
      }
    }
  }
}

SetFiltersOnLoad.PropTypes = {
  mutator: PropTypes.object,
  updateStateFilter: PropTypes.func
}

export { SetFiltersOnLoad };