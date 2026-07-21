import { describe, expect, it } from 'vitest';
import {
  buildInitialInvitationContent, normalizeInvitationContent, normalizeInvitationTheme,
  resolveInvitationPalette, slugifyWedding,
} from './invitationContent.js';

describe('commercial invitation content', () => {
  it('normalizes partial content without losing required sections', () => {
    const content = normalizeInvitationContent({ couple: { brideName: 'Lan' }, schedule: [{ time: '09:00', label: 'Đón khách' }] });
    expect(content.couple.brideName).toBe('Lan');
    expect(content.couple.groomName).toBeTruthy();
    expect(content.event.mapUrl).toMatch(/^https:/);
    expect(content.schedule).toEqual([{ time: '09:00', label: 'Đón khách' }]);
  });

  it('builds a customer invitation with a timezone-aware event', () => {
    const content = buildInitialInvitationContent({
      groomName: 'Đức Anh', brideName: 'Hà My', eventDate: '2027-08-21', eventTime: '17:30',
      venueName: 'Lời Hẹn Palace', address: 'Hà Nội', mapUrl: '', invitationMessage: 'Trân trọng kính mời.',
    });
    expect(content.event.startsAt).toBe('2027-08-21T17:30:00+07:00');
    expect(content.event.mapUrl).toContain('H%C3%A0%20N%E1%BB%99i');
    expect(content.copy.intro).toBe('Trân trọng kính mời.');
  });

  it('creates stable Vietnamese URL slugs', () => {
    expect(slugifyWedding('Đức Anh & Hà My')).toBe('duc-anh-ha-my');
  });

  it('normalizes editor theme controls to supported layers and motion modes', () => {
    expect(normalizeInvitationTheme({
      hiddenLayers: ['story', 'event', 'story', 'unknown'],
      motion: 'reduced',
    })).toEqual({
      hiddenLayers: ['story', 'event'], motion: 'reduced', palette: 'original', font: 'original',
      colors: { surface: '', ink: '', accent: '' },
      mediaPositions: {},
      layerEffects: {},
      textStyles: {},
    });
    expect(normalizeInvitationTheme({ hiddenLayers: 'story', motion: 'invalid' }))
      .toEqual({
        hiddenLayers: [], motion: 'full', palette: 'original', font: 'original',
        colors: { surface: '', ink: '', accent: '' },
        mediaPositions: {},
        layerEffects: {},
        textStyles: {},
      });
  });

  it('sanitizes sparse focal points without changing untouched images', () => {
    expect(normalizeInvitationTheme({
      mediaPositions: {
        hero: { x: -12.4, y: 104.8 },
        bride: { x: 28.6, y: 41.2 },
        unknown: { x: 10, y: 20 },
        groom: { x: 'bad', y: 50 },
      },
    }).mediaPositions).toEqual({
      hero: { x: 0, y: 100 },
      bride: { x: 29, y: 41 },
    });
    expect(normalizeInvitationTheme().mediaPositions).toEqual({});
  });

  it('keeps only supported custom effects for editable layers', () => {
    expect(normalizeInvitationTheme({
      layerEffects: { cover: 'rise', story: 'zoom', media: 'original', unknown: 'fade', event: 'spin' },
    }).layerEffects).toEqual({ cover: 'rise', story: 'zoom' });
  });

  it('sanitizes sparse text formatting without accepting arbitrary CSS targets', () => {
    expect(normalizeInvitationTheme({
      textStyles: {
        'couple.groomName': { fontSize: 120, color: '#A13B4A', align: 'center', font: 'romantic', bold: true },
        'schedule.2.label': { fontSize: 8, italic: true },
        'copy.story': { color: 'red;display:none', align: 'justify', font: 'unknown' },
        'body *': { color: '#000000', bold: true },
      },
    }).textStyles).toEqual({
      'couple.groomName': { fontSize: 96, color: '#a13b4a', align: 'center', font: 'romantic', bold: true },
      'schedule.2.label': { fontSize: 10, italic: true },
    });
  });

  it('resolves curated and sanitized custom appearance values', () => {
    expect(resolveInvitationPalette({ palette: 'sage' })).toEqual({
      surface: '#f7faf6', ink: '#26332b', accent: '#6a806d',
    });
    expect(resolveInvitationPalette({
      palette: 'custom',
      colors: { surface: '#ABCDEF', ink: 'red;display:none', accent: '#123456' },
    }, '#765432')).toEqual({ surface: '#abcdef', ink: '#202020', accent: '#123456' });
  });
});
