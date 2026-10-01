import { describe, expect, it } from 'vitest';
import {
  additionalInvitationItems,
  allInvitationSlugs,
  archivedInvitationSlugs,
  currentCatalogSlugs,
  missingInvitationIds,
} from './invitationCatalog.js';

describe('invitation catalog', () => {
  it('contains the 108 current templates and two archived templates without duplicates', () => {
    expect(currentCatalogSlugs).toHaveLength(108);
    expect(archivedInvitationSlugs).toEqual(['thiep-cuoi-51', 'thiep-cuoi-112']);
    expect(allInvitationSlugs).toHaveLength(110);
    expect(new Set(allInvitationSlugs).size).toBe(allInvitationSlugs.length);
  });

  it('publishes every recovered catalog template in the library', () => {
    expect(missingInvitationIds).toHaveLength(27);
    expect(additionalInvitationItems).toHaveLength(27);
    expect(additionalInvitationItems.every((item) => item.path && item.image && item.details.length >= 3)).toBe(true);
  });
});
