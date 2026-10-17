import { describe, expect, it } from 'vitest';
import {
  allInvitationSlugs,
  archivedInvitationSlugs,
  currentCatalogSlugs,
  keptTemplateIds,
} from './invitationCatalog.js';

describe('invitation catalog', () => {
  it('contains exactly the 11 kept templates without duplicates', () => {
    expect(currentCatalogSlugs).toHaveLength(11);
    expect(keptTemplateIds).toEqual([3, 4, 7, 10, 14, 16, 27, 47, 48, 55, 56]);
    expect(archivedInvitationSlugs).toHaveLength(0);
    expect(allInvitationSlugs).toHaveLength(11);
    expect(new Set(allInvitationSlugs).size).toBe(11);
  });
});
