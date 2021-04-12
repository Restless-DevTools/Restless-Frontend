import { formatDistance } from 'date-fns';

const getDistanceFormattedDate = (date) => formatDistance(
  new Date(date), new Date(), { addSuffix: true },
);

export default { getDistanceFormattedDate };
