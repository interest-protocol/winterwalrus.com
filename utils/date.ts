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

const MS_SCALES_MAP = {
  [SECOND_MS]: 's',
  [MINUTE_MS]: 'm',
  [HOUR_MS]: 'h',
  [DAY_MS]: 'd',
  [WEEK_MS]: 'w',
  [MONTH_MS]: 'm',
  [YEAR_MS]: 'y',
};

export const msToShortDate = (ms: number) => {
  const scale = MS_SCALES.toReversed().find((scale) => ms / scale > 1);

  return `${scale ? Math.floor(ms / scale) : ms}${
    scale ? MS_SCALES_MAP[scale] : 'ms'
  }`;
};
