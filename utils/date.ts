const SECOND_MS = 1000;
const MINUTE_MS = SECOND_MS * 60;
const HOUR_MS = MINUTE_MS * 60;
const DAY_MS = HOUR_MS * 24;
const WEEK_MS = DAY_MS * 7;
const MONTH_MS = DAY_MS * 30;
const YEAR_MS = DAY_MS * 365;

const MS_SCALES = [
  SECOND_MS,
  MINUTE_MS,
  HOUR_MS,
  DAY_MS,
  WEEK_MS,
  MONTH_MS,
  YEAR_MS,
];

const MS_SHORT_SCALES_MAP = {
  [SECOND_MS]: 's',
  [MINUTE_MS]: 'm',
  [HOUR_MS]: 'h',
  [DAY_MS]: 'd',
  [WEEK_MS]: 'w',
  [MONTH_MS]: 'm',
  [YEAR_MS]: 'y',
};

const MS_SCALES_MAP = {
  [SECOND_MS]: 'second',
  [MINUTE_MS]: 'minute',
  [HOUR_MS]: 'hour',
  [DAY_MS]: 'day',
  [WEEK_MS]: 'week',
  [MONTH_MS]: 'month',
  [YEAR_MS]: 'year',
};

export const msToDate = (ms: number, short: boolean = false) => {
  const scale = MS_SCALES.toReversed().find((scale) => ms / scale > 1);

  if (!scale)
    return `${ms} ${short ? 'ms' : `millisecond${ms === 1 ? '' : 's'}`}`;

  const value = Math.floor(ms / scale);

  return `${value} ${(short ? MS_SHORT_SCALES_MAP : MS_SCALES_MAP)[scale]}${
    short ? '' : `${value === 1 ? '' : 's'}`
  }`;
};
