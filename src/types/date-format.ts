type TwoDigit = `${number}${number}`;
type FourDigit = `${number}${number}${number}${number}`;

export type DateFormat =
    `${FourDigit}-${TwoDigit}-${TwoDigit} ${TwoDigit}:${TwoDigit}:${TwoDigit}`;
