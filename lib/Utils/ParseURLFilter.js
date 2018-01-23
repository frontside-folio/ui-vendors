import { filterState } from '@folio/stripes-components/lib/FilterGroups/FilterGroups';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ParseURLFilter = (props) => {
  var filters;
  if (props.location.search !== null) {
    var onCheckString = _.includes(props.location.search, '?filters=');
    if (onCheckString) {
      var url = decodeURIComponent(props.location.search);
      var urlTrimStart = _.trimStart(url, '?filters=');
      var atSignIndex = urlTrimStart.indexOf("&");
      var nurl = atSignIndex !== Number(-1) ? urlTrimStart.substring(0, atSignIndex) : urlTrimStart;
      return filters = nurl;
    }
  }
  return filters;
}

ParseURLFilter.PropTypes = {
  mutator: PropTypes.object,
}

export default ParseURLFilter;