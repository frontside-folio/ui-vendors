import moment from 'moment-timezone';
import _ from 'lodash';

const FormatTime = (data, type) => {
  const date = ((((data || {}).edi || {}).edi_job || {}).date || {});
  const time = ((((data || {}).edi || {}).edi_job || {}).time || {});
  const dateFormat = 'YYYY-MM-DDThh:mm:ss.SSSZ';
  const timezone = moment.tz.guess();

  if (time.length > 0 && !_.isEmpty(time)) {
    if (type === 'post') {
      const newDate = (date.length > 0 && !_.isEmpty(date)) ? date : moment().tz(timezone).format(dateFormat);
      const parseDate = newDate.split('T');
      const convertTime = () => {
        if (time.toString().includes('T')) {
          const checkTime = time.split('T');
          return checkTime[1].split('.');
        } else {
          const checkTime = time.split('.');
          return checkTime[0];
        }
      };
      const dateTime = moment.tz(`${parseDate[0]}T${convertTime()}`, timezone).format(dateFormat);
      return dateTime.toString();
    }

    if (type === 'get') {
      console.log(time);
      if (time.toString().includes('T')) {
        const newTime = moment.tz(time, timezone).format(dateFormat);
        console.log(newTime);
        const parseTime = newTime.split('T');
        console.log(parseTime);
        console.log(parseTime[1]);
        return parseTime[1];
      } else {
        // If no date make date;
        const newDate = moment.tz(time, timezone).format(dateFormat);
        const newTime = moment.tz(`${newDate[0]}T${time}`, timezone).format(dateFormat);
        console.log(newTime);
        const parseTime = newTime.split('T');
        console.log(parseTime[1]);
        return parseTime[1];
      }
    }
    return false;
  }
  return false;
};

export default FormatTime;
