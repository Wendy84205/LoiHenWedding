import { describe, expect, it } from 'vitest';
import { calculateWeddingCountdown } from './useWeddingCountdown.js';

describe('calculateWeddingCountdown', () => {
  it('returns days, hours, minutes and seconds until the wedding', () => {
    const now = new Date('2027-01-01T00:00:00.000Z').getTime();
    const target = '2027-01-02T02:03:04.000Z';
    expect(calculateWeddingCountdown(target, now)).toEqual([1, 2, 3, 4]);
  });

  it('never returns negative values after the event', () => {
    expect(calculateWeddingCountdown('2020-01-01T00:00:00.000Z')).toEqual([0, 0, 0, 0]);
  });
});
