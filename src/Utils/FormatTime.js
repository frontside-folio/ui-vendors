import moment from 'moment-timezone';
import _ from 'lodash';

const FormatTime = (data, type) => {
  const date = ((((data || {}).edi || {}).edi_job || {}).date || {});
  const time = ((((data || {}).edi || {}).edi_job || {}).time || {});
  const dateFormat = 'YYYY-MM-DDThh:mm:ss.SSSZ';
  const timezone = moment.tz.guess();
  const momentCurDate = moment().tz(timezone).format(dateFormat);

  if (time.length > 0 && !_.isEmpty(time)) {
    if (type === 'post') {
      const newDate = (date.length > 0 && !_.isEmpty(date)) ? moment(date).format(dateFormat) : moment().tz(timezone).format(dateFormat);
      const parseDate = newDate.split('T');
      const parseTimeZone = parseDate[1].split('.');
      const curDate = parseDate[0];
      const curTimeZone = parseTimeZone[1];

      if (time.toString().includes('T')) {
        const checkTime = time.split('T');
        const splitTime = checkTime[1].split('.');
        const getTime = splitTime[0];
        const getDate = `${curDate}T${getTime}.${curTimeZone}`;
        return getDate;
      } else {
        const parseTime = time.split('.');
        const curTime = parseTime[0];
        const getDate = `${curDate}T${curTime}.${curTimeZone}`;
        return getDate;
      }
    }

    if (type === 'get') {
      if (!time.toString().includes('T')) return false;
      const newTime = moment(time).tz(timezone).format('h:mm A.ZZ');
      return newTime;
    }
    return false;
  }
  return false;
};

export default FormatTime;
