import { describe, expect, it } from 'vitest';
import { resolveWeddingCalendar } from './NewInvitationCommon.jsx';

describe('resolveWeddingCalendar', () => {
  it('uses the correct Monday-first offset and day count for a named month', () => {
    expect(resolveWeddingCalendar({ month: 'FEBRUARY · 2027' })).toEqual({ offset: 0, dayCount: 28 });
    expect(resolveWeddingCalendar({ month: 'NOVEMBER 2027' })).toEqual({ offset: 0, dayCount: 30 });
  });

  it('understands numeric labels and explicit dates', () => {
    expect(resolveWeddingCalendar({ month: '29 . 11 . 2027' })).toEqual({ offset: 0, dayCount: 30 });
    expect(resolveWeddingCalendar({ month: '', date: '2050-05-22' })).toEqual({ offset: 6, dayCount: 31 });
  });

  it('keeps the supplied fallback for decorative calendars without a date', () => {
    expect(resolveWeddingCalendar({ month: '', offset: 3, dayCount: 30 })).toEqual({ offset: 3, dayCount: 30 });
  });
});
