const {
    NS_IN_ONE_MS,
    NS_IN_ONE_SECOND,
    DEFAULT_DECIMAL_PRECISION,
    MS_IN_ONE_DAY,
    MS_IN_ONE_HOUR,
    MS_IN_ONE_MINUTE,
    MS_IN_ONE_SECOND
  } = require('./constants');



const msToHumanReadableTime = (ms) => {
  const days = Math.floor(ms / MS_IN_ONE_DAY);
  const hours = Math.floor((ms % MS_IN_ONE_DAY) / MS_IN_ONE_HOUR);
  const minutes = Math.floor((ms % MS_IN_ONE_HOUR) / MS_IN_ONE_MINUTE);
  const seconds = Math.floor((ms % MS_IN_ONE_MINUTE) / MS_IN_ONE_SECOND);

  const parts = [];
  if (days > 0) parts.push(`${ days } day${ days === 1 ? '' : 's' }`);
  if (hours > 0) parts.push(`${ hours } hour${ hours === 1 ? '' : 's' }`);
  if (minutes > 0) parts.push(`${ minutes } minute${ minutes === 1 ? '' : 's' }`);
  if (seconds > 0) parts.push(`${ seconds } second${ seconds === 1 ? '' : 's' }`);

  if (parts.length === 0) return '0 seconds';
  else if (parts.length === 1) return parts[0];
  else if (parts.length === 2) return `${ parts[0] } and ${ parts[1] }`;
  else {
    const lastPart = parts.pop();
    const formattedParts = parts.join(', ');
    return `${ formattedParts }, and ${ lastPart }`;
  }
};

module.exports = {
  msToHumanReadableTime
};