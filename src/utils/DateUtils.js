import { format, formatDistance } from 'date-fns';

const getFullFormattedDate = (date) => format(
  new Date(date), 'MM/dd/yyyy HH:mm',
);

const getDistanceFormattedDate = (date) => formatDistance(
  new Date(date), new Date(), { addSuffix: true },
);

const formatTimeFromMilliseconds = (time) => {
  let timeBase = time;

  const ms = timeBase % 1000;
  timeBase = (timeBase - ms) / 1000;
  const secs = timeBase % 60;
  timeBase = (timeBase - secs) / 60;
  const mins = timeBase % 60;
  const hrs = (timeBase - mins) / 60;

  if (hrs > 0) {
    return `${hrs}.${mins} hours`;
  } if (mins > 0) {
    return `${mins}.${secs} minutes`;
  } if (secs > 0) {
    return `${secs}.${ms} seconds`;
  }

  return `${ms} milliseconds`;
};

export default {
  getDistanceFormattedDate,
  formatTimeFromMilliseconds,
  getFullFormattedDate,
};
